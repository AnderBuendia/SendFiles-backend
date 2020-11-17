const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config({path: 'config/variables.env'});

exports.authenticateUser = async (req, res, next) => {
    /* Check errors // Show error messages from express validator */
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    /* Verify if user is registered */
    // console.log(req.body)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
        res.status(401).json({ msg: 'User is wrong or not exists'});

        /* Stops the execution of the code */
        return next();
    }

    /* Verify password and auth user */
    if (bcrypt.compareSync(password, user.password)) {
        /* Create JWT */
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.name
        }, process.env.SECRET_JWT, {
            expiresIn: '8h'
        });

        // console.log(token);
        res.json({token});
    } else {
        res.status(401).json({ msg: 'Wrong Password' });
        return next();
    }
    
}

exports.userAuthenticated = (req, res) => {
    res.json({user: req.user});
}