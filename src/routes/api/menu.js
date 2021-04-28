const axios = require('axios');
const express = require('express');

const router = express.Router();

router.get('/today/eng', (req, res) => {
    axios.get('http://api.tf.fi/taffa/en/today/').then((r) => {
        const data = r.data;
        // console.log(data);
        res.send(data);
    });
});

router.get('/today/fin', (req, res) => {
    axios.get('http://api.tf.fi/taffa/fi/today/').then((r) => {
        const data = r.data;
        // console.log(data);
        res.send(data);
    });
});

router.get('/today/swe', (req, res) => {
    axios.get('http://api.tf.fi/taffa/sv/today/').then((r) => {
        const data = r.data;
        // console.log(data);
        res.send(data);
    });
});

router.get('/week/eng', (req, res) => {
    axios.get('http://api.tf.fi/taffa/en/html/week/').then((r) => {
        const data = r.data;
        // console.log(data);
        res.send(data);
    });
});


router.get('/week/fin', (req, res) => {
    axios.get('http://api.tf.fi/taffa/fi/html/week/').then((r) => {
        const data = r.data;
        // console.log(data);
        res.send(data);
    });
});


router.get('/week/swe', (req, res) => {
    axios.get('http://api.tf.fi/taffa/sv/html/week/').then((r) => {
        const data = r.data;
        // console.log(data);
        res.send(data);
    });
});

module.exports = router;