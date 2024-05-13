const express = require('express');
const router = express.Router();

async function jobApplicationController (req, res) {
    try {
        res.render('job-application');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  jobApplicationController;