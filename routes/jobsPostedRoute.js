const express = require('express');
const router = express.Router();
const jobsPostedController = require('../controllers/jobsPostedController')

router.get('/jobs', jobsPostedController.jobsPosted);

router.get('/job-applicants/:jobId', jobsPostedController.getApplicationsByJobId);

module.exports = router;