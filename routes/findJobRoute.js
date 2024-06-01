const express = require('express');
const router = express.Router();
const  {findJobController, findJobQuery} = require('../controllers/findJobController')

router.get('/', findJobController);

router.get('/jobs', findJobQuery);
module.exports = router;