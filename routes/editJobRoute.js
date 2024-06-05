const express = require('express');
const router = express.Router();
const editJobController = require('../controllers/editJobController');
const {isClient, saveOriginalUrl} = require('../middlewares/passport')

router.get('/edit-job/:id', saveOriginalUrl, isClient, editJobController.editJob);
router.post('/edit-job/:id', isClient, editJobController.updateJob);

// Delete job route
router.post('/delete-job/:id', isClient, editJobController.deleteJob);

module.exports = router;