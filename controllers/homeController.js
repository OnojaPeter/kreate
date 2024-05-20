const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');
const {isAuthenticated} = require('../middlewares/passport')

async function home (req, res) {
    try {
        const allJobs = await Job.find({});
        // console.log("all jobs:", allJobs);
        res.render('home', {allJobs, isAuthenticated});
    } catch(error) {
        console.error('Error:', error);
    }
}


module.exports =  {
    home,
};