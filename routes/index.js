const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => res.json({ success: true, message: 'Welcome to RestApi' }));
router.use('/auth', require('../api/auth'));
router.use('/user', require('../api/user'));

module.exports = router;
