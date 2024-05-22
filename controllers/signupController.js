const express = require('express');
const router = express.Router();
const User = require('../models/users')

async function chooseSignupController (req, res) {
    try {
        res.render('choose-signup');
    } catch(error) {
        console.error('Error:', error);
    }
}

async function talentSignupController (req, res) {
    try {
        const message = ''
        res.render('talent-signup', {message});
    } catch(error) {
        console.error('Error:', error);
    }
}

async function clientSignupController (req, res) {
    try {
        const message = ''
        res.render('client-signup', {message});
    } catch(error) {
        console.error('Error:', error);
    }
}


const talentSignupPost = async (req, res) => {
    const { fname, lname, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const message = 'Talent with mail already exists';
        return res.render('talent-signup', { message });
      }
  
      const newUser = new User({ fname, lname, email, password, role: 'talent' });
      await newUser.save();
  
      res.redirect('/login');
    } catch (err) {
      console.error(err);
      res.render('talent-signup', { message: 'An error occurred, please try again.' });
    }
  };
  
  const clientSignupPost = async (req, res) => {
    const { fname, lname, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const message = 'Client with mail already exists';
        return res.render('client-signup', { message });
      }
  
      const newUser = new User({ fname, lname, email, password, role: 'client' });
      await newUser.save();
  
      res.redirect('/login');
    } catch (err) {
      console.error(err);
      res.render('client-signup', { message: 'An error occurred, please try again.' });
    }
  };
  
module.exports =  {
    chooseSignupController,
    talentSignupController,
    clientSignupController,
    talentSignupPost,
    clientSignupPost,
};