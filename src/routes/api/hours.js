const express = require('express');
const Hours = require('../../models/Hours');

const router = express.Router();

router.get('/', (req, res) => {
    Hours.find({}, (err, hours) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.send(hours);
        }
    });
});

router.post('/', (req, res) => {
    const nhours = JSON.parse(req.body.text);
    Hours.findOne({}, (err, hours) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else if (!hours) {
            const newHours = new Hours({
                hours: nhours.hours
            });
            newHours.save();
        }
        else {
            hours.hours = nhours;
            hours.save();
        }
    });
});

module.exports = router;