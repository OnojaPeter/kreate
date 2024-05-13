const express = require('express');
const router = express.Router();
const  findJobController = require('../controllers/findJobController')

router.get('/', findJobController);

module.exports = router;