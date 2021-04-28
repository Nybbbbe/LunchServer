const axios = require('axios');
const express = require('express');
const passport = require("passport");

const router = express.Router();

router.get('/today', (req, res) => {
    axios.get('http://api.tf.fi/taffa/en/today/').then((r) => {
        const data = r.data;
        // console.log(data);
        res.send(data);
    });
    
});

router.get('/week', (req, res) => {
    axios.get('http://api.tf.fi/taffa/en/html/week/').then((r) => {
        const data = r.data;
        // console.log(data);
        res.send(data);
    });
});

module.exports = router;