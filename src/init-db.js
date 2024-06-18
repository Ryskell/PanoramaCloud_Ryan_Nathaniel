const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Définir le chemin absolu pour le fichier de base de données
const dbPath = path.resolve(__dirname, './db/user.db');

// Vérifier si le répertoire existe, sinon le créer
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Ouvrir la base de données
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)", (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Users table created or already exists.');
        }
    });
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
