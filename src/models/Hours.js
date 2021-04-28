const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hoursSchema = new Schema({
    hours: String
});

const Hours = mongoose.model('Hours', hoursSchema);
module.exports = Hours;