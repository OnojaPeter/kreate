const express = require('express');
const router = express.Router();

async function home (req, res) {
    try {
        res.render('home');
    } catch(error) {
        console.error('Error:', error);
    }
}


module.exports =  {
    home,
};