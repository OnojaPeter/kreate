const express = require('express');
const router = express.Router();
const { searchJob } = require('./formsController')
const Job = require('../models/jobs');
// const somthing = location.searchJob;
async function findJobController (req, res) {
    try {
        const { category:jobCategory, searchTitle, searchLocation } = req.query;
        
        let query = {};

        // Check if category parameter is provided
        // if (category) {
        //     query.jobCategory = category; // Add category filter to the query
        // }
        if (jobCategory) query.jobCategory = { $in: jobCategory.split(',') };
        // Perform the search
        const jobs = await Job.find(query); // Call the function to construct the query
        // console.log('reached here')
        // Return JSON response
        // res.json({ jobs, jobCategory });
        res.render('find-job', {jobs, jobCategory, searchTitle, searchLocation})
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching jobs.' });
    }
}

async function findJobQuery (req, res) {
    try {
        const { jobType, jobCategory, jobLevel, salary, searchTitle, searchLocation, page = 1, limit = 3  } = req.query;
        // console.log('search title:', searchTitle)
        const query = {};

        if (searchTitle) query.jobTitle = { $regex: searchTitle, $options: 'i' };
        if (searchLocation) query.companyLocation = { $regex: searchLocation, $options: 'i' };
        if (jobType) query.jobType = { $in: jobType.split(',') };
        if (jobCategory) query.jobCategory = { $in: jobCategory.split(',') };
        if (jobLevel) query.jobLevel = { $in: jobLevel.split(',') };
        if (salary) {
            // Parse salary filter values
            const salaryRanges = salary.split(',');
            const salaryQueries = [];

            // Construct MongoDB query for each selected salary range
            salaryRanges.forEach(range => {
                const [min, max] = range.split('-');
                if (max) {
                    salaryQueries.push({ salary: { $gte: parseInt(min), $lte: parseInt(max) } });
                } else {
                    salaryQueries.push({ salary: { $gte: parseInt(min) } });
                }
            });

            // Combine all salary queries using $or operator
            query.$or = salaryQueries;
        }

        const skip = (page - 1) * limit;
        const jobs = await Job.find(query).skip(skip).limit(parseInt(limit));
        // console.log('jobs:', jobs)
        const totalJobs = await Job.countDocuments(query);
        // console.log('totalJobs:', totalJobs)

        res.json({ jobs, totalJobs, currentPage: parseInt(page), totalPages: Math.ceil(totalJobs / limit) }); 
        // const jobs = await Job.find(query);
        // res.json({ jobs });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching jobs.' });
    }
};

module.exports =  {
    findJobController,
    findJobQuery,
};