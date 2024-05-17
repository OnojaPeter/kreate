const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/jobApplicationController')

router.get('/', applicationController.jobApplicationController);

module.exports = router;