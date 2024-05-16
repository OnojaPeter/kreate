const express = require('express');
const router = express.Router();
const Job = require('../models/jobs')

async function jobApplicationController (req, res) {
    const jobId = req.query.id;
    // console.log("job id:",jobId);
    try {
        res.render('job-application', {jobId});
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  jobApplicationController;