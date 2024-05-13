const express = require('express');
const router = express.Router();
const  newPasswordController = require('../controllers/newPasswordController')

router.get('/', newPasswordController);

module.exports = router;