var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Order = require('../models/order');
var Cart = require('../models/cart');
var User = require('../models/users');
var Promo = require('../models/promo');
var Product = require('../models/products');

router.use(function(req, res, next) {
    Product.find((err, products) => {
        res.locals.products = products;
        res.status(200);
        next();
    });
});

router.use(function(req, res, next) {
    Promo.find((err, promos) => {
        var tmp = [];
        promos.forEach(function(element) {
            if (element.start <= Date.now() && element.end >= Date.now()) {
                tmp.push(element);
            }
        }, this);
        res.locals.promos = tmp;
        res.status(200);
        next();
    });
});

router.use(function(req, res, next) {
    Order.find((err, orders) => {
        res.locals.orders = orders.sort(function(a, b) {
            return a.isDelivered - b.isDelivered;
        });
        res.locals.orders = res.locals.orders.sort(function(a, b) {
            if (!a.isDelivered && !b.isDelivered) {
                return a.createAt - b.createAt;
            }
        });
        res.status(200);
        next();
    });
});

router.use(function(req, res, next) {
    User.find((err, users) => {
        res.locals.users = users;
        res.status(200);
        next();
    });
});

// router.use(function(req, res, next) {
//     Feedback.find((err, feedbacks) => {
//         res.locals.feedbacks = feedbacks;
//         res.status(200);
//         next();
//     });
// });

router.get('/', isLoggedIn, isStaff, function(req, res, next) {
    var errMsg = req.flash('error');
    var sucMsg = req.flash('success');

    res.render('dashboard/dashboard', {
        title: 'Dashboard',
        errMsg: errMsg,
        hasError: errMsg.length > 0,
        sucMsg: sucMsg,
        hasSuccess: sucMsg.length > 0
    });
});

router.get('/order/:id', isLoggedIn, isStaff, function(req, res, next) {
    var sucMsg = req.flash('success');
    var errMsg = req.flash('error');
    console.log(sucMsg);
    console.log(errMsg);
    var user;
    var order = res.locals.orders.filter(ORDER => {
        return ORDER._id == req.params.id;
    })[0];
    if (order.userId) {
        user = res.locals.users.filter(USER => {
            return USER._id.toString() == order.userId.toString();
        })[0];
    } else {
        user = 'Guest';
    }
    order.cart = new Cart(order.cart);
    order.cart.items = order.cart.generateArray();
    // console.log(order);
    res.render('dashboard/order', {
        title: 'Order',
        order: order,
        orderUser: user,
        hasError: errMsg,
        hasSuccess: sucMsg,
        errMsg: errMsg,
        sucMsg: sucMsg
    });
});

router.post('/order/delkey', isLoggedIn, isStaff, function(req, res, next) {
    var orderId = req.body.id;
    var order = res.locals.orders.filter(ORDER => {
        return ORDER._id == orderId;
    })[0];
    order.key1 = null;
    order.key2 = null;
    Order.findByIdAndUpdate(orderId, order, (err, result) => {
        if (err) {
            next(err);
        }
        console.log(result);
        req.flash('success', 'Key was deleted!');
        res.redirect(`/dashboard/order/${orderId}#key`);
    });
});

router.post('/order/genkey', isLoggedIn, isStaff, function(req, res, next) {
    var orderId = req.body.id;
    var order = res.locals.orders.filter(ORDER => {
        return ORDER._id == orderId;
    })[0];
    var newOrder = new Order(order);
    var key = genKey();
    newOrder.key1 = newOrder.encryptKey(key);
    newOrder.key2 = key;
    // console.log(`### Key: ${newOrder.key2}`);
    // console.log(`### Saulte: ${newOrder.key1}`);
    // console.log(newOrder);
    Order.findByIdAndUpdate(orderId, newOrder, (err, result) => {
        if (err) {
            next(err);
        }
        console.log(result);
        req.flash('success', 'Key was generated!');
        res.redirect(`/dashboard/order/${orderId}#key`);
    });
});

router.post('/order/checkey', isLoggedIn, isStaff, function(req, res, next) {
    var orderId = req.body.id;
    var key = req.body.key;
    var order = res.locals.orders.filter(ORDER => {
        return ORDER._id == orderId;
    })[0];
    var newOrder = new Order(order);
    if (newOrder.validKey(key)) {
        newOrder.isDelivered = true;
        newOrder.key1 = null;
        newOrder.key2 = null;
        Order.findByIdAndUpdate(orderId, newOrder, (err, result) => {
            if (err) {
                next(err);
            }
            console.log(result);
            req.flash('success', 'Thanks for bought!');
            res.redirect(`/dashboard/order/${orderId}#key`); // TODO: Redirect to Service rating
        });
    } else {
        req.flash('error', 'Key not valid!');
        res.redirect(`/dashboard/order/${orderId}#key`);
    }
});

router.post('/user/upd', isLoggedIn, isStaff, function(req, res, next) {
    var user = res.locals.users.filter(USER => {
        return USER._id == req.body.id;
    })[0];
    user.status = req.body.status;
    User.findByIdAndUpdate(user._id, user, (err, user) => {
        if (err) {
            next(err);
        }
        res.redirect('/dashboard#users');
    });
});

router.post('/user/find', isLoggedIn, isStaff, function(req, res, next) {
    var query = req.body.query.toLowerCase().trim();
    res.locals.users = res.locals.users.filter(USER => {
        if (USER.username.toLowerCase().indexOf(query) != -1 ||
            USER.email.toLowerCase().indexOf(query) != -1 ||
            USER.telephone.indexOf(query) != -1) {
            return true;
        }
        return false;
    });
    res.render('dashboard/dashboard', {
        title: 'Dashboard'
    });
});

router.get('/user/sort=:id', isLoggedIn, isStaff, function(req, res, next) {
    var sort = req.params.id;
    res.locals.users = res.locals.users.sort(function(a, b) {
        var x = a[sort].toLowerCase();
        var y = b[sort].toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
    res.render('dashboard/dashboard', {
        title: 'Dashboard'
    });
});

router.post('/user/del', isLoggedIn, isStaff, function(req, res, next) {
    User.findByIdAndRemove(req.body.id, (err, user) => {
        if (err) {
            next(err);
        }
        res.redirect('/dashboard#users');
    });
});

module.exports = router;

function genKey() {
    const str = 'abcdefghijklm012345nopqrstuvwxyz6789';
    var key = '';
    var char = '';
    var lenKey = 6;

    while (lenKey) {
        var register = Math.random(1).toFixed(0);
        char = str[(Math.random() * (str.length - 1)).toFixed(0)];

        if (register > 0) {
            key = key.concat(char.toUpperCase());
        } else {
            key = key.concat(char);
        }
        lenKey--;
    }

    return key;
}

function isStaff(req, res, next) {
    if (res.locals.staff || res.locals.admin) {
        return next();
    }
    res.redirect('/');
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        req.session.oldUrl = null;
        return next();
    }
    req.session.oldUrl = '/dashboard' + req.url;
    res.redirect('/user/signin');
}