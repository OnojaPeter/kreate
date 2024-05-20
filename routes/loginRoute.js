const express = require('express');
const router = express.Router();
const  loginController = require('../controllers/loginController')
const passport = require('passport')

router.get('/', loginController);

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

module.exports = router;