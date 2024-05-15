const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');
// const { default: mongoose } = require('mongoose');

async function searchJob (req, res) {
    const name = req.body.searchTitle;
    const location = req.body.searchLocation;
    // console.log("name:",name);

    try {
        //the $regex and $options makess the search case sensitive
        let query = {};

        // Check if name and/or location are provided
        if (name && location) {
            // Search by both name and location
            query = {
                jobTitle: { $regex: name, $options: 'i' },
                companyLocation: { $regex: location, $options: 'i' }
            };
        } else if (name) {
            // Search only by name
            query = { jobTitle: { $regex: name, $options: 'i' } };
        } else if (location) {
            // Search only by location
            query = { companyLocation: { $regex: location, $options: 'i' } };
        }

        // console.log('query:',query);
        // Execute the query to find matching jobs
        const findJobs = await Job.find(query);
        // console.log('job found:',findJobs);
        
          
        // console.log(findJobs)
        res.render('find-job', {jobs:findJobs,  searchTitle: name, searchLocation:location})
    } catch(error) {
        console.error('Error:', error);
    }
}

async function postJob (req, res) {
    try {
        const {
            companyName,
            aboutCompany,
            companyLocation,
            companyLogo,
            jobTitle,
            jobDescription,
            jobRequirement,
            jobCategory,
            jobType,
            jobLevel,
            salary,
            vacancy,
            applyBefore,
        } = req.body

        const newJob = new Job({
            companyName,
            aboutCompany,
            companyLocation,
            companyLogo,
            jobTitle,
            jobDescription,
            jobRequirement,
            jobCategory,
            jobType,
            jobLevel,
            salary,
            vacancy,
            applyBefore,
        });

        // Save the new job to the database
        const savedJob = await newJob.save();
        console.log("job saved:", savedJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports =  {
    searchJob,
    postJob,
};