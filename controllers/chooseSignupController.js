const express = require('express');
const router = express.Router();

async function chooseSignupController (req, res) {
    try {
        res.render('choose-signup');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  chooseSignupController;