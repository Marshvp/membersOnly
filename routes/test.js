const express = require('express');
const router = express.Router();

const testController = require('../controllers/testUserController');

/* GET home page. */
router.get('/', testController.index);

// POST on home page
router.post('/', testController.addUser);

module.exports = router