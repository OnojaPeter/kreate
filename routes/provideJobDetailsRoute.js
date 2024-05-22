const express = require('express');
const router = express.Router();
const  provideJobDetailsController = require('../controllers/provideJobDetailsController');
const {isClient} = require('../middlewares/passport')

router.get('/', isClient, provideJobDetailsController);

module.exports = router;