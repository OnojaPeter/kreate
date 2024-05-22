const Application = require('../models/applications');

async function viewApplications (req, res) {
    try {
        const userEmail = req.user.email
        const jobsApplied = await Application.find({email: userEmail}).populate('jobId');
        // console.log('job applied:', jobsApplied)
        res.render('viewJobsApplication', {jobsApplied})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {viewApplications};