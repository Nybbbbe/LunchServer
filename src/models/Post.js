const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    contentType: String,
    image: Buffer,
    language: String,
    date: {type: Number, default: Date.now},
    visible: {type: Boolean, default: true}
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;