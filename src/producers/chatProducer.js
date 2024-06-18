const amqp = require('amqplib/callback_api');

function sendMessage(queue, message) {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(message));
            console.log(" [x] Sent %s", message);
        });
        setTimeout(function () {
            connection.close();
        }, 500);
    });
}

module.exports = { sendMessage };
