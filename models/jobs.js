const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        require
    },
    location: {
        type: String,
        require
    }
})

module.exports = mongoose.model('Job', jobSchema);