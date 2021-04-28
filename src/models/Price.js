const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceSchema = new Schema({
    description: String,
    priceStudent: Number,
    priceNormal: Number
});

const Price = mongoose.model('Price', priceSchema);
module.exports = Price;