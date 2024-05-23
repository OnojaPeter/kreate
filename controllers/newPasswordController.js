const express = require('express');
const router = express.Router();
const User = require('../models/users');

async function newPasswordController (req, res) {
    try {
        const { token } = req.params;
        console.log('token found:', token);

        const user = await User.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } });
        // console.log('User found:', user);

        if (!user) {
            // Invalid or expired token
            // console.log('Invalid or expired token');
            req.flash('error_msg', 'Invalid or expired token');
            return res.redirect('/reset-password');
        }

        res.render('new-password', { token });
    } catch(error) {
        console.error('Error rendering reset password page:', error);
        req.flash('error_msg', 'Something went wrong. Please try again.');
        res.redirect('/reset-password');
    }
}

async function newPasswordPost  (req, res) {
    const { token } = req.params;
    const { password } = req.body;
    console.log('new password:', password);

    try {
        const user = await User.findOne({ resetToken: token });
        console.log('found user with the token id:', user);

        if (!user || user.resetTokenExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // console.log('former pw:', user.password);
    
        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save();

        req.flash('success_msg', 'Password reset successful');
        res.redirect('/login');
    } catch (error) {
        console.error('Reset password error:', error);
        req.flash('error_msg', 'Something went wrong. Please try again.');
        res.redirect('/reset-password');
        // res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports =  {
    newPasswordController,
    newPasswordPost
};