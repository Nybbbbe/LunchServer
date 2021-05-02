// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const issueJWT = require('./utils').issueJWT;
const validPassword = require('./utils').validPassword;

require('./passport')(passport);

// Models
const User = require('./models/User');

mongoose.connect('mongodb://localhost/lunch');

mongoose.connection.once('open', () => {
    console.log('Connected to lunch db');
}).on('error', (err) => {
    console.log('Failed to connect to db: ' + err);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/login', async (req, res) => {
    console.log("Trying to log in")
    try {
        console.log(req.body)
        const { username, password } = req.body;

        User.findOne({ username: username }, (err, user) => {
            console.log(user);
            if (user) {
                const isValid = validPassword(password, user.hash, user.salt);
                console.log(isValid);
                if (isValid) {
                    const jwt = issueJWT(user);
                    console.log(jwt);
                    return res.status(200).json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires });
                } else {
                    return res.status(401).json({ success: false, msg: "Wrong Credentials" });
                }
            } else {
                console.log(err);
                return res.status(401).json(err);
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(401).json(error);
    }
});

const posts = require('./routes/api/posts');
const hours = require('./routes/api/hours');
const prices = require('./routes/api/prices');
const messages = require('./routes/api/messages');
const menu = require('./routes/api/menu');

app.use('/api/posts', posts);
app.use('/api/hours', hours);
app.use('/api/prices', prices);
app.use('/api/messages', messages);
app.use('/api/menu', menu);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('Server running on port ' +  port);
});