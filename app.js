var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var debug = require('debug')('mongoose');

var index = require('./routes/index');
var promo = require('./routes/promo');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var product = require('./routes/product');
var cart = require('./routes/cart');

var app = express();
var env = app.get('env');
var db = require('./config/app.config')[env].db.url();

if (env !== 'production') {
    // config app
}

mongoose.connect(db, () => {
    debug(`Connected with DataBase: %s`, db);
});

require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: '7hbt72E1nJ5ob4Vm',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 } // Maximum Time Session: Minutes * Seconds * Miliseconds
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.notProd = env !== 'production';
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    if (res.locals.login) {
        res.locals.user = req.user;
        res.locals.admin = req.user.status === 'admin';
        res.locals.staff = req.user.status === 'staff';
    }
    next();
});

app.use('/', index);
app.use('/shop', product);
app.use('/promo', promo);
app.use('/cart', cart);
app.use('/user', users);
app.use('/dashboard', dashboard);

// catch 404
app.use('*', function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;

    // render the error page
    res.status(404);
    res.render('error', {
        title: `Error ${res.statusCode}`,
        message: err.message,
        error: err
    });
});

// error handler
app.use(function(err, req, res, next) {
    debug('error handler - req.statusCode: %s', req.statusCode);
    debug('error handler - res.statusCode: %s', res.statusCode);

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        title: `Error ${res.statusCode}`,
        error: err
    });
});

module.exports = app;