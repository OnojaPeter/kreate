const express = require('express');
const router = express.Router();

async function loginController (req, res) {
    try {
        const message = '';
        res.render('login', {message});
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports = loginController