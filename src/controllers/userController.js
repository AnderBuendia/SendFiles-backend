const User = require('../models/User');
const { validationResult } = require('express-validator');
const AsyncManager = require('../utils/asyncManager');
const handlePassword = require('../utils/handlePassword');

exports.newUser = AsyncManager(async (req, res) => {
    /* Show error messages from express validator */
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    /* Verified if user was registered */
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ msg: 'User is already registered'});
    }

    /* Hash Password */
    const userPassword = handlePassword(password);
    req.body = { ...req.body, password: userPassword };

    /* Create new user */
    user = await User.create(req.body);

    try {
        res.json({ msg: 'The user was successfully created' }); 
    } catch (error) {
        console.log(error);
    }
});