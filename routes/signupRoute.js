const express = require('express');
const router = express.Router();
const  signupController = require('../controllers/signupController')

router.get('/', signupController.chooseSignupController);

router.get('/talent', signupController.talentSignupController);
router.post('/talent', signupController.talentSignupPost);

router.get('/client', signupController.clientSignupController);
router.post('/client', signupController.clientSignupPost);

module.exports = router;