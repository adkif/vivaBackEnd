const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

router.route('/registration')
    .post(user.signup);
router.route('/login')
    .post(user.signin);

module.exports = router;