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
                name: { $regex: '^' + name + '$', $options: 'i' },
                location: { $regex: '^' + location + '$', $options: 'i' }
            };
        } else if (name) {
            // Search only by name
            query = { name: { $regex: '^' + name + '$', $options: 'i' } };
        } else if (location) {
            // Search only by location
            query = { location: { $regex: '^' + location + '$', $options: 'i' } };
        }

        // Execute the query to find matching jobs
        const findJobs = await Job.find(query);
        
          
        // console.log(findJobs)
        res.render('find-job', {jobs:findJobs,  searchTitle: name, searchLocation:location})
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  {
    searchJob,
};