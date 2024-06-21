const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.dashboard);
router.get('/dashboard', userController.dashboard);


module.exports = router