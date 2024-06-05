const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/jobApplicationController');
// const passport = require('passport')
const {isTalent, saveOriginalUrl} = require('../middlewares/passport')

router.get('/',saveOriginalUrl, isTalent, applicationController.jobApplicationController);

module.exports = router;