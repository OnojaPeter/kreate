const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/users');

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.TRANSPORTER_USER,
        pass: process.env.TRANSPORTER_PASS,
    }
});

async function resetPasswordController (req, res) {
    try {
        res.render('reset-password');
    } catch(error) {
        console.error('Error:', error);
    }
}

async function resetPassword (req, res) {
    const { email } = req.body;

    try {
        const userExist = await User.findOne({email})
        console.log("user exist:",userExist);

        if (userExist) {
            // Generate Token
            const token = crypto.randomBytes(20).toString('hex');
            console.log('token:', token);

            const userUpdate = await User.findOneAndUpdate({ email }, {
                resetToken: token,
                resetTokenExpires: Date.now() + 600000 // Token expires in 10 minutes 
            }, { new: true });
            // console.log('user after User.findOneAndUpdate:', userUpdate);

            await transporter.sendMail({
                to: email,
                subject: 'Password Reset Request',
                html: `
                    <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
                    <p>Please click on the following link or paste it into your browser to complete the process:</p>
                    <p><a href="${req.protocol}://${req.get('host')}/reset-password/${token}">Reset Password</a></p>
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                `,
            });

            req.flash('success_msg', 'Reset password link sent to your email');

            res.redirect('/reset-password');
            // res.status(200).json({ message: 'Reset password email sent' });
        } else {
            req.flash('error_msg', 'User does not exist, please signup');
            res.redirect('/reset-password');
            // res.status(500).json({ message: 'user does not exist, please signup'});
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(400).json({ message: 'Internal server error' });
    }
};

module.exports =  {
    resetPasswordController,
    resetPassword,
};