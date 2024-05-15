const express = require('express');
const router = express.Router();
const  formsController = require('../controllers/formsController')


router.post('/find-job', formsController.searchJob)

module.exports = router;