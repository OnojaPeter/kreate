const express = require('express')
const router = express.Router();
const {viewApplications} = require('../controllers/viewJobsApplicationController');
const {isTalent} = require('../middlewares/passport')

router.get('/view-applications', isTalent, viewApplications);

module.exports = router;