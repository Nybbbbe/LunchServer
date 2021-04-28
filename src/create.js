const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const Hours = require('./models/Hours');
const Price = require('./models/Price');
const Message = require('./models/Message');
const genPasswordHash = require('./utils').genPasswordHash;

mongoose.connect('mongodb://localhost/lunch');

mongoose.connection.once('open', () => {
    console.log('Connected to lunch db');
}).on('error', (err) => {
    console.log('Failed to connect to db: ' + err);
});

const saltHash = genPasswordHash("123");

const salt = saltHash.salt;
const hash = saltHash.hash;

const newUser = new User({
    username: 'test',
    hash: hash,
    salt: salt
});

newUser.save(err => {
    if (err) {
        console.log('Could not save user');
    } else {
        console.log('User saved successfully');
    }
});

const newPost = new Post({
    title: 'Random title 1',
    content: 'According to all known laws of aviation, there is no way that a bee should be able to fly.',
    visible: true
});

newPost.save(err => {
    if (err) {
        console.log('Could not save post');
    } else {
        console.log('Post saved successfully');
    }
});

const newHours = new Hours({
    hours: 'Mon - Fri 10:30 - 15:00',
    language: "eng"
});

newHours.save(err => {
    if (err) {
        console.log('Could not save hours');
    } else {
        console.log('Hours saved successfully');
    }
});

const newPrice = new Price({
    description: 'A great meal',
    priceStudent: 2.60,
    priceNormal: 5.00
});

newPrice.save(err => {
    if (err) {
        console.log('Could not save price');
    } else {
        console.log('Price saved successfully');
    }
});

const newMessage = new Message({
    message: 'This friday we will have a barbeque party!',
    language: "eng"
});

newMessage.save(err => {
    if (err) {
        console.log('Could not save message');
    } else {
        console.log('Message saved successfully');
    }
});

process.exitCode = 0;