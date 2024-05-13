const express = require('express');
const router = express.Router();
const  jobInfoController = require('../controllers/jobInfoController')

router.get('/', jobInfoController);

module.exports = router;