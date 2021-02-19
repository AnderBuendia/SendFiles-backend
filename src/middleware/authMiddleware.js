const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    // console.log(req.get('Authorization'));
    const authHeader = req.get('Authorization');

    if (authHeader) {
        try {
            /* Get token */
            const token = authHeader.split(' ')[1];

            /* Check JWT */
            const user = jwt.verify(token, process.env.SECRET_JWT);
            req.user = user;
           
        } catch (error) {
            console.log(error);
            console.log('JWT is not valid');
        }
    }

    return next();
}