const mongoose = require('mongoose');

//view in mongosh with db.applications.find().pretty()
const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    cv: {
        type: String,
       
    },
    coverLetter: {
        type: String,
    },
    
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application