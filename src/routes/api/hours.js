const express = require('express');
const Hours = require('../../models/Hours');
const passport = require("passport");
require('../../passport')(passport);

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

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log("Adding hours");
    console.log(req.body);
    const { nhours } = req.body;
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
            return res.status(200).json({msg: "New hours added"});
        }
        else {
            hours.hours = nhours;
            hours.save();
            return res.status(200).json({msg: "Hours updated added"});
        }
    });
});

module.exports = router;