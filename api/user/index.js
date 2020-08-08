const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.get('/', controller.currentUser);
router.get('/loginList', controller.loginList);

module.exports= router;
