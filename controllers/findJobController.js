const express = require('express');
const router = express.Router();
const { searchJob } = require('./formsController')
const Job = require('../models/jobs');
// const somthing = location.searchJob;
async function findJobController (req, res) {
    try {
        let jobs = [];
        const searchTitle = req.body.searchTitle;
        const searchLocation = req.body.searchLocation;
        // console.log(searchTitle);

        if (searchTitle || searchLocation) {
            // Call the searchJob function to retrieve the search results
            await searchJob(req, res);
            
        } else {
            // If no search parameters provided, fetch all jobs
            const jobs = await Job.find({});
            res.render('find-job', { jobs, searchTitle, searchLocation });
        }

        // Render the find-job page with the search results
        
        // const { findJobs, searchTitle, searchLocation } = await searchJob(req, res);
        // console.log("jobs:",findJobs);
        // console.log("title:",searchTitle);
        // console.log("location:",searchLocation);
        // Pass the retrieved data to the rendered page
        // res.render('find-job', {jobs:findJobs});
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  findJobController;