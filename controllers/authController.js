const User = require('../models/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('../passportConfig');
const asyncHandler = require('express-async-handler');


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

exports.registerNewUser_post = [
    
    body('username')
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage('Name must be between 1 and 20 characters')
        .escape(),
        
    body('password')
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage('Password must be between 1 and 20 characters')
        .escape(),

    body('confirmPassword')
        .trim()
        .custom((value, { req } ) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true
        })
        .escape(), 

    body('membershipLevel')
        .trim()
        .isIn(['bronze', 'silver', 'gold'])
        .withMessage('Invalid membership level')
        .escape(),

    asyncHandler(async ( req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.render('register', { err: errors.array() });
            return;
        } else {
            const existingUsers = await User.find({ name: req.body.username });
            if(existingUsers.length > 0) {
                res.render('register', { err: 'Username already exists' });
                return;
            } else {
                try {

                    const hashedPassword = await bcrypt.hash(req.body.password, 10)
                    const user = new User({
                        name: req.body.username,
                        password: hashedPassword,
                        membership: req.body.membershipLevel,
                    });
                    user.save();
                    res.redirect('/login');
                } catch(err) {
                        return next(err);
                }
            } 
       }
    })

    
]

exports.registerNewUser_get = (req, res) => {
    res.render('register', { err: null });
}