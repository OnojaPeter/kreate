const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');
const Application = require('../models/applications')
const upload = require('../middlewares/multerFileUpload');
const mongoose = require('mongoose')
const transporter = require('../utilities/transporter')
require('dotenv').config();
const nodemailer = require('nodemailer');

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
        const findJobs = await Job.find(query);
        // console.log('job found:',findJobs);
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

        const companyLogo = req.file ? req.file.path : '/public/images/Ellipse.png';

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
        const userEmail = req.user.email;
        const jobId = req.body.jobId;

        // const objectId = mongoose.Types.ObjectId.createFromHexString(jobId);
        // console.log(objectId)
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            req.flash('error_msg', 'Invalid Job ID');
            return res.redirect('/find-job'); // Adjust the redirect URL as needed
        }

        const checkUserOnApplication = await Application.findOne({
            jobId: jobId,
            email: userEmail
        });
        // console.log("checkUserOnApplication:", checkUserOnApplication)

        if (checkUserOnApplication) {
            req.flash('error_msg', 'You have already applied for this job');
            return res.redirect('/job-application?id=' + jobId);
        }

        const filePaths = req.files.map(file => file.path);

        const application = new Application({
            jobId: jobId,
            fullName: req.body.fullName,
            email: req.body.email,
            cv: filePaths[0], // Assuming the first file is the CV
            coverLetter: filePaths[1], // Assuming the second file is the cover letter
            message: req.body.message,
            appliedAt: new Date()
        });
        //   console.log('application:', application)
        await application.save();
        res.render('application-success')


        // res.status(200).send('applied success');
    } catch (error) {
        console.error("Error:",error)
    }
}

async function subscribe (req, res) {
    const email = req.body.email
    try {

        let mailOptions = {
            from: `"Peter" <${process.env.TRANSPORTER_USER}>`,
            to: email,
            subject: 'Welcome to Kreate Job Alerts!',
            text: `Dear ${email},

                Thank you for signing up for job alerts from Kreate! We're excited to help you find the perfect job. From now on, you'll be receiving daily job alerts tailored to your preferences.

                Please note: This is a mockup, and no actual job alerts will be sent. If you have any questions or need further assistance, feel free to contact me.

                Best regards,
                Peter`,
                        
        };

        let info = await transporter.sendMail(mailOptions);

        res.json({ message: 'Subscription successful! You will receive job alerts daily.' });
        // console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.log('Error:', error);
        res.json({message: 'Subscription failed. Please try again.'})
    }
}
module.exports =  {
    searchJob,
    postJob,
    submitApplication,
    subscribe
};