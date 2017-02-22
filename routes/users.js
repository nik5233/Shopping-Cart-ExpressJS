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

router.get('/update/:id', isLoggedIn, function(req, res, next) {
    res.render('user/update', {
        title: 'Update Profile',
        csrfToken: req.csrfToken(),
        user: req.user,
        account: req.params.id == 'account',
        address: req.params.id == 'address',
        card: req.params.id == 'card',
        path: req.params.id
    });
});

router.post('/update/:id', isLoggedIn, function(req, res, next) {
    var formName = req.params.id;
    var newUser = req.body; // Array
    var curUser = req.user;

    User.findOne(curUser._id, function(err, user) {
        if (err) {
            res.redirect('/');
        }
        if (formName === 'account') {
            if (curUser.email !== newUser.email) {
                curUser.email = newUser.email;
            }

            if (newUser.password[0]) {
                console.log('Password not empty');
                if (user.validPassword(newUser.password[0])) {
                    console.log('Password checked');
                    if (newUser.password[1] == newUser.password[2]) {
                        curUser.password = user.encryptPassword(newUser.password[1]);
                        console.log('Password updated');
                    }
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
            }
            user.update(curUser, (err, result) => {
                if (err) {
                    console.log("Error");
                }
                console.log("Saved");
                res.redirect('/user/profile');
            });
        }
        if (formName === 'address') {
            if (curUser.address.country !== newUser.country) {
                curUser.address.country = newUser.country;
            }
            if (curUser.address.region !== newUser.region) {
                curUser.address.region = newUser.region;
            }
            if (curUser.address.city !== newUser.city) {
                curUser.address.city = newUser.city;
            }
            if (curUser.address.zip !== newUser.zip) {
                curUser.address.zip = newUser.zip;
            }
            if (curUser.address.street !== newUser.street) {
                curUser.address.street = newUser.street;
            }
            if (curUser.address.building !== newUser.building) {
                curUser.address.building = newUser.building;
            }
            if (curUser.address.appartament !== newUser.appartament) {
                curUser.address.appartament = newUser.appartament;
            }
            user.update(curUser, (err, result) => {
                if (err) {
                    console.log("Error");
                }
                console.log(result);
                res.redirect('/user/profile');
            });
        }
        if (formName === 'card') {
            if (curUser.card.name !== newUser.name) {
                curUser.card.name = newUser.name;
            }
            if (curUser.card.number !== newUser.number) {
                curUser.card.number = newUser.number;
            }
            if (curUser.card.month !== newUser.month) {
                curUser.card.month = newUser.month;
            }
            if (curUser.card.year !== newUser.year) {
                curUser.card.year = newUser.year;
            }
            if (curUser.card.cvc !== newUser.cvc) {
                curUser.card.cvc = newUser.cvc;
            }
            user.update(curUser, (err, result) => {
                if (err) {
                    console.log("Error");
                }
                console.log(result);
                res.redirect('/user/profile');
            });
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