const express = require('express');
const router = express.Router();

async function resetPasswordController (req, res) {
    try {
        res.render('reset-password');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  resetPasswordController;