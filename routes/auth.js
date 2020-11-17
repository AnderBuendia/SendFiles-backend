const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',
    [
        check('email', 'Set a valid email').isEmail(),
        check('password', 'Password cannot be empty').notEmpty()
    ],      
    authController.authenticateUser
);

router.get('/',
    authMiddleware,
    authController.userAuthenticated
);

module.exports = router;