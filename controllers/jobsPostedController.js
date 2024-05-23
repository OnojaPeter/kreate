const express = require('express');
const router = express.Router();
const Job = require('../models/jobs')
const Application = require('../models/applications');

async function jobsPosted (req, res) {
    try {
        const userId = req.user._id;
        // console.log(userId);
        const jobs = await Job.find({ postedBy: userId });
        // console.log('job with userId:', jobs)
        // Fetch application counts for each job
        const jobApplicationsCount = await Application.aggregate([
            { $group: { _id: '$jobId', count: { $sum: 1 } } }
        ]);
        // console.log('jobApplicationsCount:', jobApplicationsCount)

        // Create a map for quick lookup
        const jobApplicationsMap = {};
        jobApplicationsCount.forEach(job => {
            jobApplicationsMap[job._id] = job.count;
        });

        // Attach the application count to each job
        const jobsWithApplicationCounts = jobs.map(job => {
            return {
                ...job.toObject(),
                applicationCount: jobApplicationsMap[job._id] || 0
            };
        });

        res.render('jobs', { jobs: jobsWithApplicationCounts });
        // res.render('jobs', { jobs });
        // res.status(200).json({ allJobs });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getApplicationsByJobId (req, res) {
    const { jobId } = req.params;
    // console.log(jobId)
  
    try {
      // Query the database to find applications by job ID
      const applications = await Application.find({ jobId });
  
      // Return applications as a response
    //   res.status(200).json({ applications });
    res.render('applications', {applications})
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports =  {
    jobsPosted,
    getApplicationsByJobId,
};