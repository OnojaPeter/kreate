const express = require('express');
const router = express.Router();
const  signupController = require('../controllers/signupController')

router.get('/', signupController.chooseSignupController);

router.get('/talent', signupController.talentSignupController);

router.get('/client', signupController.clientSignupController);

module.exports = router;