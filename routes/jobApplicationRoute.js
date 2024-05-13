const express = require('express');
const router = express.Router();
const  jobApplicationController = require('../controllers/jobApplicationController')

router.get('/', jobApplicationController);

module.exports = router;