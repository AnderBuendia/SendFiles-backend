const bcrypt = require('bcrypt');

module.exports = (userPass) => {    
    /* Hash password */
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(userPass, salt);

    return password;
};