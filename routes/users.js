var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Order = require('../models/order');
var Cart = require('../models/cart');
var User = require('../models/users');

var csrfProtection = csrf();
router.use(csrfProtection);

/* User Profile */
router.get('/profile', isLoggedIn, function(req, res, next) {
    Order.find({ user: req.user }, (err, orders) => {
        if (err) {
            res.write('Error!');
        }
        var cart;
        orders.forEach(order => {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', {
            title: 'Profile',
            orders: orders,
            user: req.user
        });
    });
});

router.get('/update', isLoggedIn, function(req, res, next) {
    res.render('user/update', {
        title: 'Update Profile',
        csrfToken: req.csrfToken(),
        user: req.user
    });
});

router.post('/update', isLoggedIn, function(req, res, next) {
    var newUser = req.body;
    var user = req.user;
    // Telephone
    if (newUser.telephone !== user.telephone) {
        var reg = /\D/gi;
        var tel = newUser.telephone.trim().replace(reg, '');
        if (tel.length > 10) {
            var len = tel.length;
            tel = tel.slice(len - 10, len);
        }
        user.telephone = tel;
    }
    // Card
    if (newUser.number !== user.card.number) {
        user.card.name = newUser.name.toLowerCase();
        user.card.number = +newUser.number;
        user.card.month = +newUser.month;
        user.card.year = +newUser.year;
        user.card.cvc = +newUser.cvc;
    }
    // Address
    if (newUser.country !== user.address.country) {
        user.address.country = newUser.country.toLowerCase();
        user.address.region = newUser.region.toLowerCase();
        user.address.city = newUser.city.toLowerCase();
        user.address.zip = +newUser.zip;
        user.address.street = newUser.street.toLowerCase();
        user.address.building = newUser.building;
        user.address.appartament = newUser.appartament;
    }
    User.findById(user._id, (err, data) => {
        if (err) {
            res.redirect('/user/update');
        }
        data.update(user, (err, result) => {
            if (err) {
                res.write(err);
            }
            res.redirect('/user/profile');
        });
    });
});

router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logOut();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

/* Users Sign Up Form */
router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0,
        title: 'Sign Up'
    });
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        res.redirect(oldUrl);
        req.session.oldUrl = null;
    } else {
        res.redirect('/user/profile');
    }
});

/* Users Sign In Form */
router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0,
        title: 'Sign In'
    });
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        res.redirect(oldUrl);
        req.session.oldUrl = null;
    } else {
        res.redirect('/user/profile');
    }
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}