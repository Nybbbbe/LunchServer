const express = require('express');
const Hours = require('../../models/Hours');
const passport = require("passport");
require('../../passport')(passport);

const router = express.Router();

router.get('/:lang', (req, res) => {
    Hours.findOne({ 'language': req.params.lang }, (err, hours) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            return res.send(hours);
        }
    });
});

router.post('/:lang', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log("Adding hours");
    const { hours, language } = req.body.obj;
    Hours.findOne({ 'language': req.params.lang }, (err, dbHours) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else if (!dbHours) {
            const newHours = new Hours({
                hours: hours,
                language: language
            });
            newHours.save();
            return res.status(200).json({msg: "New hours added"});
        }
        else {
            dbHours.hours = hours;
            dbHours.save();
            return res.status(200).json({msg: "Hours updated"});
        }
    });
});

module.exports = router;