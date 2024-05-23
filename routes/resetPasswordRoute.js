const express = require('express');
const router = express.Router();
const  {resetPasswordController, resetPassword} = require('../controllers/resetPasswordController')

router.get('/', resetPasswordController);

router.post('/', resetPassword);

module.exports = router;