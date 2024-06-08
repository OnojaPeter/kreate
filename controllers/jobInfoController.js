const express = require('express');
const router = express.Router();
const Job = require('../models/jobs')

async function jobInfoController (req, res) {
    const jobId = req.params.id;
    try {
        // Fetch job details from MongoDB using the jobId
        const job = await Job.findById(jobId);
        const allJobs = await Job.find({_id: { $ne: jobId}}).sort({ createdAt: -1 }).limit(5)
        // console.log('allJobs:',allJobs);
        if (!job) {
            // Handle case where job is not found
            return res.status(404).send('Job not found');
        }
        // Render the job details page with the job data
        res.render('job-info', { job, allJobs });
    } catch (error) {
        console.error('Error:', error);
        // Handle other errors
        res.status(500).send('Internal Server Error');
    }
}

module.exports =  jobInfoController;