const express = require('express');
const router = express.Router();
const  formsController = require('../controllers/formsController')
const upload = require('../middlewares/multerFileUpload');


router.post('/find-job', formsController.searchJob);
router.post('/post-job', formsController.postJob);

// const cpUpload = upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'coverLetter', maxCount: 1 }])

router.post('/submit-application', upload.array('cv', 2), formsController.submitApplication);

module.exports = router;