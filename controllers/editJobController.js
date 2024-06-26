const Job = require('../models/jobs');

async function editJob (req, res) {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).send('Job not found');
        }

        res.render('edit-job', {job})
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}

// Handle the form submission to update the job details
async function updateJob (req, res) {
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
        } = req.body;

        // const companyLogo = req.file ? req.file.path : '';
        const existingJob = await Job.findById(req.params.id);
        if (!existingJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Handle the logo upload
        const companyLogo = req.file ? req.file.path : existingJob.companyLogo || 'public/images/Ellipse.png';
        console.log('company logo details:', companyLogo)
        
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            {
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
            },
            { new: true }
        );

        req.flash('success_msg', 'Job updated successfully');
        res.redirect('/jobs');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

// Handle the deletion of a job
async function deleteJob (req, res) {
    try {
        await Job.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Job deleted successfully');
        res.redirect('/jobs');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Failed to delete job');
        res.redirect('/jobs');
    }
};

module.exports = {
    editJob,
    updateJob,
    deleteJob,
}