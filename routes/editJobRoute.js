const express = require('express');
const router = express.Router();
const editJobController = require('../controllers/editJobController')

router.get('/edit-job/:id',  editJobController.editJob);
router.post('/edit-job/:id', editJobController.updateJob);

// Delete job route
router.post('/delete-job/:id', editJobController.deleteJob);

module.exports = router;