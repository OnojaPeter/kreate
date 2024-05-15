const mongoose = require('mongoose');

//view in mongosh with db.jobs.find().pretty()
const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    aboutCompany: {
        type: String,
        required: true
    },
    companyLocation: {
        type: String,
        required: true
    },
    companyLogo: {
        type: String,
        
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobRequirement: {
        type: String,
        required: true
    },
    jobCategory: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    jobLevel: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    vacancy: {
        type: Number,
        required: true
    },
    applyBefore: {
        type: Date,
        required: true
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job