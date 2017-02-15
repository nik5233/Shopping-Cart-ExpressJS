var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

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

router.get('/add/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, (err, product) => {
        if (err) {
            res.redirect('/');
        }
        cart.add(product, product._id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {
            products: null,
            title: 'Cart'
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        title: 'Cart'
    });
});

module.exports = router;