const express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'upload/'});
const Post = require('../../models/Post');
const passport = require("passport");
require('../../passport')(passport);

const router = express.Router();

router.get('/:lang', (req, res) => {
    Post.find({ 'language': req.params.lang }, (err, posts) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            posts = posts.filter(post => post.visible);
            res.send(posts);
        }
    });
});

router.get('/images/:id', (req, res) => {
    Post.findOne({'_id': req.params.id }, (err, post) => {
        if (err || post.image == undefined) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.contentType(post.contentType);
            res.send(post.image);
        }
    });
});

router.post('/:lang', passport.authenticate('jwt', {session: false}), upload.single('image'), (req, res) => {
    console.log("Adding new post");
    console.log(req.body);
    let newPost = {};
    if (req.file) {
        const img = fs.readFileSync(req.file.path);
        const encodeImage = img.toString('base64');
        newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            language: req.body.language,
            contentType: req.file.mimetype,
            image: new Buffer.alloc(req.file.size, encodeImage, 'base64')
        });
    } else {
        newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            language: req.body.language,
        });
    }
    newPost.save(err => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.status(201).send();
        }
    });
});

router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const post = JSON.parse(req.body.obj);
    Post.findOne({ _id:req.params.id }, (err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else if (result) {
            // console.log("Update existing post");
            result.title = post.title;
            result.content = post.content;
            result.visible = post.visible;
            result.save();
        }
    });
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.status(201).send();
        }
    });
});

module.exports = router;