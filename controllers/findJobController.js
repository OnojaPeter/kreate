const express = require('express');
const router = express.Router();
const { searchJob } = require('./formsController')
const Job = require('../models/jobs');
// const somthing = location.searchJob;
async function findJobController (req, res) {
    try {
        const { searchTitle, searchLocation } = req.query;

        if (searchTitle || searchLocation) {
            // If search parameters are provided, perform the search
            const jobs = await findJobQuery(req.query); // Call the function to construct the query
            res.json({ jobs, searchTitle, searchLocation }); // Return JSON response
        } else {
            // If no search parameters provided, return an empty response or all jobs
            const jobs = await Job.find({});
            res.render('find-job', { jobs, searchTitle, searchLocation });
        }
    } catch(error) {
        console.error('Error:', error);
    }
}

async function findJobQuery (req, res) {
    try {
        const { jobType, jobCategory, jobLevel, salary, searchTitle, searchLocation } = req.query;
        console.log('search title:', searchTitle)
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

        const jobs = await Job.find(query);
        res.json({ jobs });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching jobs.' });
    }
};

module.exports =  {
    findJobController,
    findJobQuery,
};