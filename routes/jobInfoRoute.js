const express = require('express');
const router = express.Router();
const  jobInfoController = require('../controllers/jobInfoController')

router.get('/:id', jobInfoController);

module.exports = router;