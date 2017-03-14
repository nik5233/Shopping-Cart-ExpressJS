var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Wish = require('../models/wish');
var Product = require('../models/products');

router.use(function(req, res, next) {
    Product.find((err, products) => {
        res.locals.products = products;
        res.status(200);

        next();
    });
});

/* Show All Products. */
router.get('/', function(req, res, next) {
    var successMsg = req.flash('success')[0];
    res.render('shop/shop', {
        title: 'Shop',
        successMsg: successMsg,
        noMessage: !successMsg
    });
});

/** 
 * Filter Product List
 * 
 * Keep it with regex validation or
 *  rewrite it using js in front-end
 * 
 * TODO: script which will prop action then
 *  check entries, concat query path and then
 *  continue action to this route
 */
router.get('/filter', function(req, res, next) {
    var body = req.query;
    console.log(body);
    var products = res.locals.products;
    var successMsg = false;

    if (body.min || body.max) {
        /**
         * TODO: regex
         */
        var min = body.min || 0;
        var max = body.max || Infinity;
        products = products.filter(prod => {
            return prod.price >= +min && prod.price <= +max;
        });
        console.log('filtered');
    }


    // filtered products
    res.locals.products = products;
    res.render('shop/shop', {
        title: 'Shop',
        successMsg: successMsg,
        noMessage: !successMsg
    });
    // res.redirect('/shop');
});

/* Product description. */
router.get('/product/:id', function(req, res, next) {
    console.log(req.params);
    var productId = req.params.id;
    var products = res.locals.products;
    var product = products.filter(prod => {
        return prod._id == productId;
    })[0];

    // console.log(product);
    res.render('shop/product', {
        title: product.title,
        product: product
    });
});

/* Add Product to Wishlist. */
router.get('/wish/:id', isLoggedIn, function(req, res, next) {
    var productId = req.params.id;
    var product = res.locals.products.filter(prod => {
        return prod._id == productId;
    })[0];
    // console.log(req.user);
    var wish = {
        user: req.user._id,
        product: product
    };
    Wish.find({ 'user': req.user._id }, (err, wishlist) => {
        wishlist = wishlist.filter(wish => {
            return wish.product._id == productId;
        })[0];
        console.log(wishlist);
        if (!wishlist) {
            Wish.create(wish, (err, result) => {
                if (err) {
                    next(err);
                } else {
                    console.log(result);
                }
                req.flash('success', `${product.title} added to wishlist`);
                res.redirect('/shop');
            });
        } else {
            req.flash('success', `You already have ${product.title} in wishlist`);
            res.redirect('/shop');
        }
    });
});

/* Add Product to Cart. */
router.post('/cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var body = req.body;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    console.log(body);

    var product = res.locals.products.filter(prod => {
        return prod._id == productId;
    })[0];
    cart.add(product, product._id, body);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/shop');
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        req.session.oldUrl = null;
        return next();
    }
    req.session.oldUrl = '/shop' + req.url;
    res.redirect('/user/signin');
}