const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');
const Application = require('../models/applications')
const upload = require('../middlewares/multerFileUpload');

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
            postedBy: req.user._id
        });

        const savedJob = await newJob.save();
        req.flash('success_msg', 'Job posted successfully');
        res.redirect('/jobs'); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function submitApplication (req, res) {
    try{
        const filePaths = req.files.map(file => file.path);

        const application = new Application({
            jobId: req.body.jobId,
            fullName: req.body.fullName,
            email: req.body.email,
            cv: filePaths[0], // Assuming the first file is the CV
            coverLetter: filePaths[1], // Assuming the second file is the cover letter
            message: req.body.message
        });
          
        await application.save();
        res.render('application-success')
        // res.status(200).send('applied success');
    } catch (error) {
        console.error("Error:",error)
    }
}

module.exports =  {
    searchJob,
    postJob,
    submitApplication,
};