const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/logout', authController.logout);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/register', authController.registerNewUser_get);
router.post('/register', authController.registerNewUser_post);

module.exports = router