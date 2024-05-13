const express = require('express');
const router = express.Router();
const  chooseSignupController = require('../controllers/chooseSignupController')

router.get('/', chooseSignupController);

module.exports = router;