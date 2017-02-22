var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Order = require('../models/order');
var Cart = require('../models/cart');
var User = require('../models/users');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/admin', isLoggedIn, isAdmin, function(req, res, next) {
    var status = req.user.status;
    // console.log(status);
    // console.log(req.user);
    // res.locals.admin = true;
    res.render('user/admin', {
        title: 'Admin Dashboard'
    });
});

router.get('/staff', isLoggedIn, isStaff, function(req, res, next) {
    var status = req.user.status;
    // console.log(status);
    // console.log(res.locals);
    // res.locals.staff = true;
    res.render('user/staff', {
        title: 'Staff Dashboard'
    });
});

module.exports = router;

function isAdmin(req, res, next) {
    if (res.locals.admin) {
        return next();
    }
    res.redirect('/');
}

function isStaff(req, res, next) {
    if (res.locals.staff) {
        return next();
    }
    res.redirect('/');
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}