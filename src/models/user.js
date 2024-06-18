const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/user.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
});

function registerUser(username, password, callback) {
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function(err) {
        callback(err);
    });
}

function authenticateUser(username, password, callback) {
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], function(err, row) {
        if (err) {
            return callback(err);
        }
        callback(null, row);
    });
}

module.exports = { registerUser, authenticateUser };
