const express = require('express');
const router = express.Router();

async function findJobController (req, res) {
    try {
        res.render('find-job');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  findJobController;