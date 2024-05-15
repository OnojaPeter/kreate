const express = require('express');
const router = express.Router();
const Job = require('../models/jobs')

async function home (req, res) {
    try {
        const allJobs = await Job.find({});
        // console.log("all jobs:", allJobs);
        res.render('home', {allJobs});
    } catch(error) {
        console.error('Error:', error);
    }
}


module.exports =  {
    home,
};