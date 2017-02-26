var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/products');
var Order = require('../models/order');

/* GET Cart page. */
router.get('/', function(req, res, next) {
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

/* Reduce Products Qty by One from Cart. */
router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    if (cart.totalQty <= 0) {
        req.session.cart = null;
    } else {
        req.session.cart = cart;
    }
    res.redirect('/cart');
});

/* Remove Product from Cart. */
router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    if (cart.totalQty <= 0) {
        req.session.cart = null;
    } else {
        req.session.cart = cart;
    }
    res.redirect('/cart');
});

/* GET Checkout page. */
router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {
        total: cart.totalPrice,
        title: 'Checkout',
        errMsg: errMsg,
        noErrors: !errMsg
    });
});

/* POST Checkout page. */
router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_Zob6eWLmep5SIgaJiij1W0SD"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Charge for sofia.taylor@example.com"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save((err, result) => {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
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