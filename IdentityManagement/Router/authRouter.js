const express = require('express');
const authController = require('../Controllers/authController.js');

const router = express.Router(); //creates a sub router for the different directories

router
    .route('/login')
    .get(authController.login);

router
    .route('/signup')
    .post(authController.signup);

module.exports = router;