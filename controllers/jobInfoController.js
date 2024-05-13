const express = require('express');
const router = express.Router();

async function jobInfoController (req, res) {
    try {
        res.render('job-info');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  jobInfoController;