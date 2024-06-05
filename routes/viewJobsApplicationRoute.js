const express = require('express')
const router = express.Router();
const {viewApplications} = require('../controllers/viewJobsApplicationController');
const {isTalent, saveOriginalUrl} = require('../middlewares/passport')

router.get('/view-applications', saveOriginalUrl, isTalent, viewApplications);

module.exports = router;