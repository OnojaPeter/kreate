const express = require('express');
const router = express.Router();
const  loginController = require('../controllers/loginController')
const passport = require('passport')

router.get('/', loginController);

// router.post('/', passport.authenticate('local', { 
//   failureRedirect: '/login',
//   keepSessionInfo: true
// }), (req, res) => {
//   req.flash('success', 'Welcome Back');
//   const redirectUrl = req.session.returnTo || '/';
//   res.redirect(redirectUrl);
// });

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log('not user');
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }
    req.logIn(user, { keepSessionInfo: true }, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Welcome Back');
      const redirectUrl = req.session.returnTo || '/';
      delete req.session.returnTo;
      return res.redirect(redirectUrl);
    });
  })(req, res, next);
});

module.exports = router;