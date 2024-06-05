const express = require('express');
const router = express.Router();
const  loginController = require('../controllers/loginController')
const passport = require('passport')

router.get('/', loginController);

router.post('/', passport.authenticate('local', { 
  failureRedirect: '/login',
  keepSessionInfo: true
}), (req, res) => {
  req.flash('success', 'Welcome Back');
  const redirectUrl = req.session.returnTo || '/';
  res.redirect(redirectUrl);
});

// router.post('/', (req, res, next) => {
//   console.log('Session before login:', req.session);
//   passport.authenticate('local', {failureRedirect: '/login', keepSessionInfo: true}, (err, user, info) => {
//       if (err) {
//           return next(err);
//       }
//       if (!user) {
//           return res.redirect('/login');
//       }
//       req.logIn(user, (err) => {
//           if (err) {
//               return next(err);
//           }
          
//           console.log('Session after login:', req.session);
//           const returnTo = req.session.returnTo || '/';
//           console.log('Redirecting to:', returnTo);
//           delete req.session.returnTo;
//           res.redirect(returnTo);
//       });
//   })(req, res, next);
// });

module.exports = router;