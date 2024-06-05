const express = require('express');
const router = express.Router();
const jobsPostedController = require('../controllers/jobsPostedController');
const {isClient, saveOriginalUrl} = require('../middlewares/passport');

router.get('/jobs', saveOriginalUrl, isClient, jobsPostedController.jobsPosted);

router.get('/job-applicants/:jobId', saveOriginalUrl, isClient, jobsPostedController.getApplicationsByJobId);

module.exports = router;