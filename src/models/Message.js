const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: String
});

const Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages;