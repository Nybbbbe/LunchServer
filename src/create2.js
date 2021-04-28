const mongoose = require('mongoose');
const Message = require('./models/Message');

mongoose.connect('mongodb://localhost/lunch');

mongoose.connection.once('open', () => {
    console.log('Connected to lunch db');
}).on('error', (err) => {
    console.log('Failed to connect to db: ' + err);
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