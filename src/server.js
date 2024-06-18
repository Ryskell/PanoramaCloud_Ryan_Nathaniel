const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const amqp = require('amqplib/callback_api');
const session = require('express-session');
const sharedSession = require('express-socket.io-session');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

// Configurer les sessions
const sessionMiddleware = session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
});

// Middleware pour parser les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utiliser le middleware de session
app.use(sessionMiddleware);

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

// Utiliser les routes d'authentification et de chat
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

// Route par défaut pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Partager la session avec socket.io
io.use(sharedSession(sessionMiddleware, {
    autoSave: true
}));

// Démarrer le serveur
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connexion à RabbitMQ et mise en place des consommateurs
amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = 'chat_queue';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            io.emit('chat message', msg.content.toString());
        }, {
            noAck: true
        });
    });
});

// Gestion des connexions socket.io
io.on('connection', (socket) => {
    const username = socket.handshake.session.username;
    console.log(`User connected: ${username}`);
    io.emit('chat message', JSON.stringify({ username: 'System', text: `${username} has joined the chat.` }));

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${username}`);
        io.emit('chat message', JSON.stringify({ username: 'System', text: `${username} has left the chat.` }));
    });

    socket.on('chat message', (msg) => {
        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                const queue = 'chat_queue';

                channel.assertQueue(queue, {
                    durable: false
                });

                const message = JSON.stringify({ username: socket.handshake.session.username, text: msg });
                channel.sendToQueue(queue, Buffer.from(message));
                console.log(" [x] Sent %s", message);
            });

            setTimeout(function () {
                connection.close();
            }, 500);
        });
    });
});
