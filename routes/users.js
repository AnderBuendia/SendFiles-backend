const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

router.post('/',
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Set a correct email').isEmail(),
        check('password', '6 characters minimum').isLength({min: 6})
    ],
    userController.newUser
);

module.exports = router;