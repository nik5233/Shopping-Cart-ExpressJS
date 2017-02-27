var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/products');

/* Show All Products. */
router.get('/', function(req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find()
        .then(products => {
            res.render('shop/shop', {
                title: 'Shop',
                products: products,
                successMsg: successMsg,
                noMessage: !successMsg
            });
        });
});

/* Product description. */
router.get('/product/:id', function(req, res, next) {
    var productId = req.params.id;

    Product.findById(productId, (err, product) => {
        if (err) {
            res.redirect('/');
        }
        console.log(product);
        res.render('shop/product', {
            title: product.title,
            product: product
        });
    });
});

/* Add Product to Cart. */
router.post('/cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var body = req.body;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    console.log(body);

    Product.findById(productId, (err, product) => {
        if (err) {
            res.redirect('/');
        }
        cart.add(product, product._id, body);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shop');
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