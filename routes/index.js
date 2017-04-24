var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/products');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
    var errMsg = req.flash('error');
    var sucMsg = req.flash('success');
    res.render('index', {
        title: 'Welcome',
        errMsg: errMsg,
        hasError: errMsg.length > 0,
        sucMsg: sucMsg,
        hasSuccess: sucMsg.length > 0
    });
});

module.exports = router;