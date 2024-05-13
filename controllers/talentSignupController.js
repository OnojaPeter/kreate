const express = require('express');
const router = express.Router();

async function talentSignupController (req, res) {
    try {
        res.render('talent-signup');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  talentSignupController;