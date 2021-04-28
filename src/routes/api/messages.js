const express = require('express');
const Message = require('../../models/Message');
const passport = require("passport");
require('../../passport')(passport);

const router = express.Router();

router.get('/:lang', (req, res) => {
    Message.findOne({ 'language': req.params.lang }, (err, message) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.send(message);
        }
    });
});

router.post('/:lang', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { nMessage, language } = JSON.parse(req.body);
    Message.findOne({ 'language': req.params.lang }, (err, message) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else if (!message) {
            const newMessage = new Message({
                message: nMessage,
                language: language
            });
            newMessage.save();
        }
        else {
            message.message = nMessage;
            message.save();
        }
    });
});

module.exports = router;