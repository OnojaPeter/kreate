const express = require('express');
const router = express.Router();
const  formsController = require('../controllers/formsController')
const upload = require('../middlewares/multerFileUpload');
const {isClient, isTalent} = require('../middlewares/passport')


router.post('/find-job', formsController.searchJob);

router.post('/post-job', isClient, formsController.postJob);

router.post('/submit-application', isTalent, upload.array('cv', 2), formsController.submitApplication);

router.post('/subscribe', formsController.subscribe)

module.exports = router;