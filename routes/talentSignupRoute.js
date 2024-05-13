const express = require('express');
const router = express.Router();
const  talentSignupController = require('../controllers/talentSignupController')

router.get('/', talentSignupController);

module.exports = router;