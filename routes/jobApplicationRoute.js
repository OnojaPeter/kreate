const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/jobApplicationController');
const {isTalent} = require('../middlewares/passport')

router.get('/', isTalent, applicationController.jobApplicationController);

module.exports = router;