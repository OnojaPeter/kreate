const express = require('express');
const router = express.Router();
const  formsController = require('../controllers/formsController')


router.post('/find-job', formsController.searchJob);
router.post('/post-job', formsController.postJob);

module.exports = router;