const mongoose = require('mongoose');
const Message = require('./models/Message');
const Hours = require('./models/Hours');
const Post = require('./models/Post');
const Price = require('./models/Price');

mongoose.connect('mongodb://localhost/lunch');

mongoose.connection.once('open', () => {
    console.log('Connected to lunch db');
}).on('error', (err) => {
    console.log('Failed to connect to db: ' + err);
});

const newPriceEng = new Price({
    description: 'A great meal',
    priceStudent: 2.60,
    priceNormal: 5.00,
    language: "eng"
});

newPriceEng.save(err => {
    if (err) {
        console.log('Could not save price');
    } else {
        console.log('Price saved successfully');
    }
});

const newPriceSwe = new Price({
    description: 'En bra måltid',
    priceStudent: 2.60,
    priceNormal: 5.00,
    language: "swe"
});

newPriceSwe.save(err => {
    if (err) {
        console.log('Could not save price');
    } else {
        console.log('Price saved successfully');
    }
});

const newPriceFin = new Price({
    description: 'Hyvä ateria',
    priceStudent: 2.60,
    priceNormal: 5.00,
    language: "fin"
});

newPriceFin.save(err => {
    if (err) {
        console.log('Could not save price');
    } else {
        console.log('Price saved successfully');
    }
});

const newPostEng = new Post({
    title: 'Random title 1',
    content: 'According to all known laws of aviation, there is no way that a bee should be able to fly.',
    language: "eng",
    visible: true
});

newPostEng.save(err => {
    if (err) {
        console.log('Could not save post');
    } else {
        console.log('Post saved successfully');
    }
});

const newPostSwe = new Post({
    title: 'Svensk titel',
    content: 'Någo jätte smart på svenska',
    language: "swe",
    visible: true
});

newPostSwe.save(err => {
    if (err) {
        console.log('Could not save post');
    } else {
        console.log('Post saved successfully');
    }
});

const newPostFin = new Post({
    title: 'Otsikko suomeksi',
    content: 'Jotain todella fiksua suomeksi',
    language: "fin",
    visible: true
});

newPostFin.save(err => {
    if (err) {
        console.log('Could not save post');
    } else {
        console.log('Post saved successfully');
    }
});

const newHoursFi = new Hours({
    hours: 'Ma - Pe 10:30 - 15:00\nSu - La Suljettu',
    language: "fin"
});

newHoursFi.save(err => {
    if (err) {
        console.log('Could not save hours');
    } else {
        console.log('Hours saved successfully');
    }
});


const newHoursSwe = new Hours({
    hours: 'Mån - Fre 10:30 - 15:00\nSö - Lö Stängt',
    language: "swe"
});

newHoursSwe.save(err => {
    if (err) {
        console.log('Could not save hours');
    } else {
        console.log('Hours saved successfully');
    }
});

const newMessageSwe = new Message({
    message: 'Nästa fredag kommer vi att ha en Barbeque fest!!!',
    language: "swe"
});

newMessageSwe.save(err => {
    if (err) {
        console.log('Could not save message');
    } else {
        console.log('Message saved successfully');
    }
});

const newMessageFin = new Message({
    message: 'Ensi perjantaina meillä on Barbeque juhlat!!!',
    language: "fin"
});

newMessageFin.save(err => {
    if (err) {
        console.log('Could not save message');
    } else {
        console.log('Message saved successfully');
    }
});


process.exitCode = 0;