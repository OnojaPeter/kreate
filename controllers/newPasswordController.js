const express = require('express');
const router = express.Router();

async function newPasswordController (req, res) {
    try {
        res.render('new-password');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  newPasswordController;