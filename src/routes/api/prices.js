const express = require('express');
const Price = require('../../models/Price');
const passport = require("passport");
require('../../passport')(passport);

const router = express.Router();

router.get('/:lang', (req, res) => {
    Price.find({ 'language': req.params.lang }, (err, prices) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.send(prices);
        }
    });
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const price = req.body.obj;
    Price.findOne({ _id:price._id }, (err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else if (result) {
            //console.log("exists");
            result.description = price.description;
            result.priceStudent = price.priceStudent;
            result.priceNormal = price.priceNormal;
            result.language = price.language
            result.save();
        } else {
            //console.log("does not exist")
            const newPrice = new Price({
                description: price.description,
                priceStudent: price.priceStudent,
                priceNormal: price.priceNormal,
                language: price.language
            });
            
            newPrice.save(err => {
                if (err) {
                    return res.status(500).json({
                        title: 'server error',
                        error: err
                    });
                } else {
                    res.status(201).send();
                }
            });
        }
    });    
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Price.deleteOne({ _id: req.params.id }, (err) => {
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