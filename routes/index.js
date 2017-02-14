var express = require('express');
var router = express.Router();
var Product = require('../models/products');

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find()
        .then(products => {
            var productChunks = [];
            var chunkSize = 3;
            for (var i = 0; i < products.length; i += chunkSize) {
                productChunks.push(products.slice(i, i + chunkSize));
            }
            res.render('shop/index', { title: 'Welcome', products: productChunks });
        });
});

module.exports = router;