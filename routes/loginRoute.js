const express = require('express');
const router = express.Router();
const  loginController = require('../controllers/loginController')
const passport = require('passport')

router.get('/', loginController);

router.post('/', passport.authenticate('local', {
    successRedirect: '/find-job',
    failureRedirect: '/login',
    failureFlash: true
  }));

module.exports = router;