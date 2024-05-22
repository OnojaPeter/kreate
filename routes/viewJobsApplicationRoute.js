const express = require('express')
const router = express.Router();
const {viewApplications} = require('../controllers/viewJobsApplicationController')

router.get('/view-applications', viewApplications);

module.exports = router;