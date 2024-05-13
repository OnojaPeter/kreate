const express = require('express');
const router = express.Router();

async function loginController (req, res) {
    try {
        res.render('login');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  loginController;