const express = require('express');
const router = express.Router();
const { sendMessage } = require('../producers/chatProducer');
const { receiveMessages } = require('../consumers/chatConsumer');

router.post('/send', (req, res) => {
    const { message } = req.body;
    sendMessage('chat_queue', message);
    res.send('Message sent!');
});

router.get('/receive', (req, res) => {
    receiveMessages('chat_queue');
    res.send('Receiving messages...');
});

module.exports = router;
