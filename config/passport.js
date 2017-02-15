var passport = require('passport');
var Users = require('../models/users');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Users.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    Users.findOne({ 'email': email }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, { message: `Email is already in use.` });
        }
        var newUser = new Users();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(passport);
        newUser.save((err, res) => {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));