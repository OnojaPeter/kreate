const express = require('express');
const router = express.Router();
const  provideJobDetailsController = require('../controllers/provideJobDetailsController');
const {isClient, saveOriginalUrl} = require('../middlewares/passport')

router.get('/', saveOriginalUrl, isClient, provideJobDetailsController);

module.exports = router;