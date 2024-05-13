const express = require('express');
const router = express.Router();
const  provideJobDetailsController = require('../controllers/provideJobDetailsController')

router.get('/', provideJobDetailsController);

module.exports = router;