const express = require('express');
const router = express.Router();
const  resetPasswordController = require('../controllers/resetPasswordController')

router.get('/', resetPasswordController);

module.exports = router;