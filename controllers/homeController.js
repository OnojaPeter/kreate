const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');
const { default: mongoose } = require('mongoose');

async function home (req, res) {
    try {
        res.render('home');
    } catch(error) {
        console.error('Error:', error);
    }
}

async function searchJob (req, res) {
    const name = req.body.searchTitle;
    const location = req.body.searchLocation;
    console.log(name);

    try {
        // const findJobs = await Job.find({name, location});
        //the $regex and $options makess the search case sensitive
        const findJobs = await Job.find({
            name: { $regex: '^' + name + '$', $options: 'i' },
            location: { $regex: '^' + location + '$', $options: 'i' }
          });
          
        // console.log(findJobs)
        res.render('find-job')
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  {
    home,
    searchJob,
};