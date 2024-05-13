const express = require('express');
const router = express.Router();

async function clientSignupController (req, res) {
    try {
        res.render('client-signup');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  clientSignupController;