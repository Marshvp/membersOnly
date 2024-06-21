const asyncHandler = require('express-async-handler');
const User = require('../models/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');


exports.index = asyncHandler(async (req, res) => {
    const users = await User.find();
    console.log(users);
    res.render('test', { users: users, err: null });
})

exports.addUser = [
    body('name')
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
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
        .escape(),

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const users = await User.find();
            console.log("Errors: ",errors);
            res.render('test', { users: users, err: errors.array() });
            return;
        } 

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);{
                const user = new User({
                    name: req.body.name,
                    password: hashedPassword,
                    membership: req.body.membership
                });
                await user.save();
                res.redirect('/test');
            }
        } catch (err) {
            console.log(err);
            res.redirect('/test');
        }
    })
]

exports.loginUser = [
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
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const users = await User.find();
            console.log("Errors: ",errors);
            res.render('test', { users: users, err: errors.array() });
            return;
        }
        passport.authenticate('local', {
            successRedirect: '/test',
            failureRedirect: '/test',
            failureFlash: true
        })
    })
]
