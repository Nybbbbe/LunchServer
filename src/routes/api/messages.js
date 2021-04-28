const express = require('express');
const Message = require('../../models/Message');
const passport = require("passport");

const router = express.Router();

router.get('/', (req, res) => {
    Message.find({}, (err, message) => {
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

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const nMessage = JSON.parse(req.body.text);
    Message.findOne({}, (err, message) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else if (!message) {
            const newMessage = new Message({
                message: nMessage.message
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