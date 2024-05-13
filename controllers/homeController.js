const express = require('express');
const router = express.Router();

async function homeController (req, res) {
    try {
        res.render('home');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  homeController;