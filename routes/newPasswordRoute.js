const express = require('express');
const router = express.Router();
const  {newPasswordController, newPasswordPost} = require('../controllers/newPasswordController')

router.get('/:token', newPasswordController);

router.post('/:token', newPasswordPost);

module.exports = router;