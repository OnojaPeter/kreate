const express = require('express');
const router = express.Router();
const editJobController = require('../controllers/editJobController');
const upload = require('../middlewares/multerFileUpload');
const {isClient, saveOriginalUrl} = require('../middlewares/passport')

router.get('/edit-job/:id', saveOriginalUrl, isClient, editJobController.editJob);
router.post('/edit-job/:id', isClient, upload.single('companyLogo'), editJobController.updateJob);

// Delete job route
router.post('/delete-job/:id', isClient, editJobController.deleteJob);

module.exports = router;