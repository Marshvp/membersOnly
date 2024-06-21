const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/logout', authController.logout);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

module.exports = router