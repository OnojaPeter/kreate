const express = require('express');
const router = express.Router();
const clientSignupController = require('../controllers/clientSignupController')

router.get('/', clientSignupController);

module.exports = router;