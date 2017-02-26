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
    var errMsg = req.flash('error');
    var sucMsg = req.flash('success');
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
            errMsg: errMsg,
            hasError: errMsg.length > 0,
            sucMsg: sucMsg,
            hasSuccess: sucMsg.length > 0,
            user: req.user
        });
    });
});

router.get('/update/:id', isLoggedIn, function(req, res, next) {
    var errMsg = req.flash('error');
    var sucMsg = req.flash('success');
    res.render('user/update', {
        title: 'Update Profile',
        csrfToken: req.csrfToken(),
        user: req.user,
        account: req.params.id == 'account',
        address: req.params.id == 'address',
        card: req.params.id == 'card',
        path: req.params.id,
        errMsg: errMsg,
        hasError: errMsg.length > 0,
        sucMsg: sucMsg,
        hasSuccess: sucMsg.length > 0,
    });
});

router.post('/update/:id', isLoggedIn, function(req, res, next) {
    var formName = req.params.id;
    var newUser = req.body; // Array
    var curUser = req.user;
    var isUpdated = false;

    User.findOne(curUser._id, function(err, user) {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/user/profile');
        }

        if (formName === 'account') {
            if (curUser.email !== newUser.email) {
                curUser.email = newUser.email;
                isUpdated = true;
            }

            if (newUser.password[0]) {
                isUpdated = true;
                if (user.validPassword(newUser.password[0])) {
                    if (newUser.password[1] == newUser.password[2]) {
                        curUser.password = user.encryptPassword(newUser.password[1]);
                    } else {
                        req.flash('error', 'New passwords not match.');
                    }
                } else {
                    req.flash('error', 'Wrong password.');
                }
            }

            if (newUser.telephone !== curUser.telephone) {
                var reg = /\D/gi;
                var tel = newUser.telephone.trim().replace(reg, '');
                if (tel.length > 10) {
                    var len = tel.length;
                    tel = tel.slice(len - 10, len);
                }
                curUser.telephone = tel;
                isUpdated = true;
            }
            updateUser(isUpdated, user, curUser, req, res);
        } else {
            for (var key in newUser) {
                var element = newUser[key];
                if (curUser[formName][key] !== element && key !== '_csrf') {
                    curUser[formName][key] = element;
                    isUpdated = true;
                }
            }
            updateUser(isUpdated, user, curUser, req, res);
        }
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

function updateUser(isUpdated, user, curUser, req, res) {
    var errMsg = req.flash('error');
    if (isUpdated) {
        if (errMsg[0] == 'New passwords not match.' || errMsg[0] == 'Wrong password.') {
            console.log('Redirect to account update');
            req.flash('error', errMsg[0]);
            res.redirect('/user/update/account');
        } else {
            console.log('Redirect to profile');
            user.update(curUser, (err, result) => {
                if (err) {
                    req.flash('error', err.message);
                    res.redirect('/user/profile');
                } else {
                    req.flash('success', `${req.params.id} was updated.`);
                    res.redirect('/user/profile');
                }
            });
        }
    } else {
        req.flash('success', 'No changes.');
        res.redirect('/user/profile');
    }
}