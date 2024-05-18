const express = require('express');
const router = express.Router();

async function chooseSignupController (req, res) {
    try {
        res.render('choose-signup');
    } catch(error) {
        console.error('Error:', error);
    }
}

async function talentSignupController (req, res) {
    try {
        res.render('talent-signup');
    } catch(error) {
        console.error('Error:', error);
    }
}

async function clientSignupController (req, res) {
    try {
        res.render('client-signup');
    } catch(error) {
        console.error('Error:', error);
    }
}

module.exports =  {
    chooseSignupController,
    talentSignupController,
    clientSignupController,
};