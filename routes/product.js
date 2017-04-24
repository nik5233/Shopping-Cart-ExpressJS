var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Product = require('../models/products');
var User = require('../models/users');
var Promo = require('../models/promo');
var Order = require('../models/order');
var Review = require('../models/review');

/** TODO:
 * this should generate auto
 */
var platforms = ['pc', 'psp', 'xbox'];
var genre = ['action', 'rpg', 'mmo', 'strategy', 'sport', 'race', 'adventure', 'simulator', 'indie', 'casual', 'space'];
// end TODO

/* Show All Products. */
router.get('/', promo, review, product, addFields, function(req, res, next) {
    var successMsg = req.flash('success')[0];
    res.render('shop/shop', {
        title: 'Shop',
        genre: genre,
        platforms: platforms,
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
            if (prod.newPrice) {
                return prod.newPrice >= +min && prod.newPrice <= +max;
            }
            return prod.price >= +min && prod.price <= +max;
        });
        console.log('filtered by price');
    }

    if (body.discount) {
        products = products.filter(prod => {
            return prod.discount;
        });
        console.log('filtered by discount');
    }

    if (body.platforms) {
        products = filter(products, body, 'platforms');
    }

    if (body.genre) {
        products = filter(products, body, 'genre');
    }

    // products = filtered products
    res.locals.products = products;
    res.render('shop/shop', {
        title: 'Shop',
        genre: genre,
        platforms: platforms,
        successMsg: successMsg,
        noMessage: !successMsg
    });
    // res.redirect('/shop');
});

/* Product description. */
router.get('/product/:id', promo, review, product, addFields, function(req, res, next) {
    var errMsg = req.flash('error');
    var sucMsg = req.flash('success');

    // console.log(product.reviews[0]);
    res.render('shop/product', {
        title: res.locals.product.title,
        errMsg: errMsg,
        hasError: errMsg.length > 0,
        sucMsg: sucMsg,
        hasSuccess: sucMsg.length > 0
    });
});

/* Add Product to Wishlist. */
router.get('/wish/:id', isLoggedIn, function(req, res, next) {
    var productId = req.params.id;
    var user = req.user;
    if (user.wishlist.indexOf(productId) == -1) {
        user.wishlist.push(productId);
        User.findByIdAndUpdate(user._id, user, (err, user) => {
            if (err) {
                next(err);
            } else {
                console.log('wishlist: ' + user.wishlist);
                Product.findById(productId, (err, product) => {
                    if (err) {
                        next(err);
                    } else {
                        product.wishers++;
                        product.save((err, data) => {
                            if (err) {
                                next(err);
                            } else {
                                console.log('wishers: ' + data.wishers);
                                req.flash('success', `${data.title} added to wishlist`);
                                res.redirect('/shop');
                            }
                        });
                    }
                });
            }
        });
    } else {
        req.flash('success', `You already have this in wishlist`);
        res.redirect('/shop');
    }
});

/* Add Product to Cart. */
router.post('/cart/:id', promo, product, addFields, function(req, res, next) {
    console.log(res.locals);
    var body = req.body;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.add(res.locals.product, res.locals.product._id, body);
    req.session.cart = cart;
    res.redirect('/shop/');
});

router.get('/new', isLoggedIn, isStaff, function(req, res, next) {
    var fields = [{
        name: 'title',
        plh: 'New Title'
    }, {
        name: 'image',
        plh: 'http://example.com/.../pic.jpg or /img/pic.jpg'
    }, {
        name: 'imageHD',
        plh: 'http://example.com/.../picHD.jpg or /img/picHD.jpg'
    }, {
        name: 'qr',
        plh: '1354942224621324'
    }, {
        name: 'tags',
        plh: 'title, genre, etc.'
    }, {
        name: 'description',
        plh: 'Little bit about the product'
    }, {
        name: 'developers',
        plh: 'Developers name'
    }, {
        name: 'screenshots',
        plh: 'http://example.com/.../picHD.jpg, http://example.com/.../picHD.jpg, http://example.com/.../picHD.jpg'
    }];
    var requirements = [{
        name: 'cpu',
        plh: '3.0 GHz dual core or better.'
    }, {
        name: 'video',
        plh: 'NVIDIA GeForce GTX 460 or better.'
    }, {
        name: 'vram',
        plh: '512 MB'
    }, {
        name: 'ram',
        plh: '2 GB'
    }, {
        name: 'dx',
        plh: 'DirectX 10'
    }, {
        name: 'hdd',
        plh: '9 GB'
    }, {
        name: 'os',
        plh: 'Windows Vista / Windows 7'
    }, ];
    res.render('shop/new', {
        title: 'New Product',
        genre: ['action', 'rpg', 'mmo', 'strategy', 'sport', 'race', 'adventure', 'simulator', 'indie', 'casual', 'space'],
        platforms: ['xbox', 'pc', 'psp'],
        fields: fields,
        requirements: requirements
    });
});

router.get('/product/:id/upd', isLoggedIn, isStaff, product, function(req, res, next) {
    var fields = [{
        name: 'title',
        plh: 'New Title'
    }, {
        name: 'image',
        plh: 'http://example.com/.../pic.jpg or /img/pic.jpg'
    }, {
        name: 'imageHD',
        plh: 'http://example.com/.../picHD.jpg or /img/picHD.jpg'
    }, {
        name: 'qr',
        plh: '1354942224621324'
    }, {
        name: 'tags',
        plh: 'title, genre, etc.'
    }, {
        name: 'description',
        plh: 'Little bit about the product'
    }, {
        name: 'developers',
        plh: 'Developers name'
    }, {
        name: 'screenshots',
        plh: 'http://example.com/.../picHD.jpg, http://example.com/.../picHD.jpg, http://example.com/.../picHD.jpg'
    }];
    var requirements = [{
        name: 'cpu',
        plh: '3.0 GHz dual core or better.'
    }, {
        name: 'video',
        plh: 'NVIDIA GeForce GTX 460 or better.'
    }, {
        name: 'vram',
        plh: '512 MB'
    }, {
        name: 'ram',
        plh: '2 GB'
    }, {
        name: 'dx',
        plh: 'DirectX 10'
    }, {
        name: 'hdd',
        plh: '9 GB'
    }, {
        name: 'os',
        plh: 'Windows Vista / Windows 7'
    }, ];
    res.render('shop/new', {
        title: 'New Product',
        genre: ['action', 'rpg', 'mmo', 'strategy', 'sport', 'race', 'adventure', 'simulator', 'indie', 'casual', 'space'],
        platforms: ['xbox', 'pc', 'psp'],
        fields: fields,
        requirements: requirements,
        product: res.locals.product[0]
    });
});

router.post('/new', isLoggedIn, isStaff, function(req, res, next) {
    var form = req.body,
        field = ['tags', 'developers', 'screenshots'];
    field.forEach(function(element) {
        var arr = form[element].split(',');
        form[element] = [];
        arr.forEach(function(el) {
            form[element].push(el.trim());
        });
    });
    var newProduct = new Product({
        system: {
            min: {
                cpu: form['min-cpu'],
                video: form['min-video'],
                vram: form['min-vram'],
                ram: form['min-ram'],
                hdd: form['min-hdd'],
                dx: form['min-dx'],
                os: form['min-os']
            },
            rec: {
                cpu: form['rec-cpu'],
                video: form['rec-video'],
                vram: form['rec-vram'],
                ram: form['rec-ram'],
                hdd: form['rec-hdd'],
                dx: form['rec-dx'],
                os: form['rec-os']
            }
        },
        qrCode: form.qr,
        imagePath: form.imageHD,
        imageHDPath: form.image,
        title: form.title,
        tags: form.tags,
        description: form.description,
        developers: form.developers,
        price: +form.price,
        platforms: form.platforms,
        genre: form.genre,
        screenshots: form.screenshots
    });
    newProduct.save((err, result) => {
        if (err) {
            next(err);
        }
        req.flash('success', 'Product added!');
        res.redirect('/dashboard#products');
    });
});

router.post('/del/:id', isLoggedIn, isStaff, function(req, res, next) {
    var productId = req.body.id;
    Product.findByIdAndRemove(productId, (err, result) => {
        if (err) {
            next(err);
        }
        console.log('### Product deleted!');
        res.redirect('/dashboard#products');
    });
});

/**
 * TODO: add auto location detecter
 */
router.post('/review', isLoggedIn, inUserOrders, function(req, res, next) {
    console.log('### I am in review create');
    var productId = req.body.productId;
    Review.find({ userId: req.user._id, productId: productId }, (err, result) => {
        if (err) {
            return next(err);
        }
        if (result.length == 0) {
            if (req.body.badSide == '') {
                req.body.badSide = undefined;
            }
            if (req.body.goodSide == '') {
                req.body.goodSide = undefined;
            }
            var newReview = new Review(req.body);
            console.log(newReview);
            newReview.save((err, result) => {
                if (err) {
                    return next(err);
                }
            });
            req.flash('success', 'You added review!');
            console.log(`req.body.productID: ${productId} | success`);
            res.redirect('/shop/product/' + productId);
        } else {
            req.flash('error', 'You already added review!');
            console.log(`req.body.productID: ${productId} | error`);
            res.redirect('/shop/product/' + productId);
        }
    });
});

router.post('/review/:id/:type', isLoggedIn, inUserOrders, function(req, res, next) {
    var type = req.params.type; // up or down
    var reviewId = req.params.id;
    console.log(`### reviewId: ${reviewId}`);
    Review.findById(reviewId, (err, review) => {
        var productId = review.productId;
        console.log(`### review.productId: ${review.productId}`);
        if (err) {
            return next(err);
        }
        if (review.userId.toString() == req.user._id.toString()) {
            req.flash('error', 'You can not vote your review!');
            return res.redirect('/shop/product/' + productId);
        }
        if (review.users.indexOf(req.user._id) != -1) {
            req.flash('error', 'You already vote this review!');
            return res.redirect('/shop/product/' + productId);
        }
        review[type] += 1;
        if (type == 'up') {
            review.total += 1;
        } else {
            review.total -= 1;
        }
        review.users.push(req.user._id);
        review.save((err, result) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Thanks for your vote!');
            res.redirect('/shop/product/' + productId);
        });
    });
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

function isStaff(req, res, next) {
    if (res.locals.staff || res.locals.admin) {
        return next();
    }
    res.redirect('/');
}

function filter(products, body, field) {
    products = products.filter(function(prod) {
        console.log(typeof body[field] != 'string');
        console.log(prod[field]);
        if (typeof body[field] != 'string') {
            var bool = true;
            body[field].forEach(function(platform) {
                if (prod[field].indexOf(platform) == -1) {
                    bool = false;
                }
            }, this);
            return bool;
        } else {
            console.log(prod[field].indexOf(body[field]) != -1);
            return prod[field].indexOf(body[field]) != -1;
        }
    });
    console.log(`filtered by ${field}`);
    return products;
}

function inUserOrders(req, res, next) {
    console.log('### I am in inUserOrders');
    var productId = req.body.productId;
    Order.find({ userId: req.user._id }, (err, orders) => {
        if (err) {
            return next(err);
        }
        var bool = false;
        orders.forEach(function(order) {
            if (typeof order.cart.items[productId] == 'object') {
                bool = true;
            }
        });
        if (bool) {
            return next();
        }
        req.flash('error', 'First, you should bought and use this product for review');
        res.redirect('/shop/product/' + productId);
    });
}

function data(str, err, data, req, res, next) {
    if (err) {
        return next(err);
    }
    res.locals[str] = data;
    res.status(200);
    return next();
}

function addFields(req, res, next) {
    var now = Date.now();
    if (res.locals.product) {
        // console.log(res.locals.product);
        var newArray = res.locals.product;
    } else {
        var newArray = res.locals.products;
    }
    newArray.forEach(function(product) {
        // indexOf would be better
        res.locals.promos.forEach(function(promo) {
            if (promo.products.indexOf(product._id) != -1) {
                if (promo.start <= now && promo.end >= now) {
                    product.discount = promo.discount;
                }
            }
        }, this);
        if (product.discount) {
            product.newPrice = +((product.price * ((100 - product.discount) / 100).toFixed(2)).toFixed(2));
        }
        if (res.locals.reviews && res.locals.reviews.length) {
            product.reviews = res.locals.reviews.filter(review => {
                return review.productId.toString() == product._id.toString();
            });
            if (product.reviews.length) {
                var rating = 0,
                    length = 0;
                product.reviews.forEach(function(review) {
                    if (review.total >= 0) {
                        rating += review.rating;
                        length += 1;
                    }
                }, this);
                if (length) {
                    product.rating = (rating / length).toFixed(1);
                }
            }
        }
    });
    if (res.locals.product) {
        res.locals.product = newArray[0];
    } else {
        res.locals.products = newArray;
    }
    res.status(200);
    return next();
}

function promo(req, res, next) {
    Promo.find((err, promos) => data('promos', err, promos, req, res, next));
}

function review(req, res, next) {
    if (req.params.id) {
        Review.find({ productId: req.params.id }, (err, reviews) => data('reviews', err, reviews, req, res, next));
    } else {
        Review.find((err, reviews) => data('reviews', err, reviews, req, res, next));
    }
}

function product(req, res, next) {
    if (req.params.id) {
        Product.find({ _id: req.params.id }, function(err, products) {
            data('product', err, products, req, res, next);
        });
    } else {
        Product.find(function(err, products) {
            data('products', err, products, req, res, next);
        });
    }
}