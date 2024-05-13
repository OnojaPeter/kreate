const express = require('express');
const router = express.Router();

async function provideJobDetailsController (req, res) {
    try {
        res.render('fill-job-details');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  provideJobDetailsController;