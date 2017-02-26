var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/products');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find()
        .then(products => {
            res.render('index', {
                title: 'Welcome'
            });
        });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}