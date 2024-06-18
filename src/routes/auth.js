const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser } = require('../models/user');

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    registerUser(username, password, (err) => {
        if (err) {
            res.json({ success: false, message: 'Erreur lors de l\'inscription' });
        } else {
            res.json({ success: true, message: 'Inscription réussie' });
        }
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    authenticateUser(username, password, (err, user) => {
        if (err) {
            res.json({ success: false, message: 'Erreur lors de la connexion' });
        } else if (user) {
            req.session.username = username;
            req.session.save(() => {
                res.json({ success: true, message: 'Connexion réussie' });
            });
        } else {
            res.json({ success: false, message: 'Identifiants incorrects' });
        }
    });
});

module.exports = router;
