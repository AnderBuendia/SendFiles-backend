const express = require('express');
const router = express.Router();
const linksController = require('../controllers/linksController');
const filesController = require('../controllers/filesController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',
    [
        check('name', 'Upload a file').notEmpty(),
        check('original_name', 'Upload a file').notEmpty()
    ],
    authMiddleware,
    linksController.newLink
);

router.post('/:url',
    linksController.verifyPassword,
    linksController.getLink
);

router.get('/',
    linksController.allLinks
);

router.get('/:url',
    linksController.hasPassword,
    linksController.getLink
);


module.exports = router;