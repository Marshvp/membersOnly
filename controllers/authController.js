const User = require('../models/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('../passportConfig');


exports.login_get = (req, res) => {
    res.render('login');
}


exports.login_post = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
});

exports.logout = (req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        res.redirect('/');
    });
};


