const express = require('express');
const router = express.Router();
const jobsPostedController = require('../controllers/jobsPostedController');
const {isClient} = require('../middlewares/passport');

router.get('/jobs', isClient, jobsPostedController.jobsPosted);

router.get('/job-applicants/:jobId', isClient, jobsPostedController.getApplicationsByJobId);

module.exports = router;