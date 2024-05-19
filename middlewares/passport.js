const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/users');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return done(null, false, { message: 'Incorrect email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)

        if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
        }
    
        return done(null, user);
    } catch (error) {
        return done(error);
    }
    // User.findOne({ email: email }, (err, user) => {
    //   if (err) return done(err);
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect email.' });
    //   }
    //   user.comparePassword(password, (err, isMatch) => {
    //     if (err) return done(err);
    //     if (!isMatch) {
    //       return done(null, false, { message: 'Incorrect password.' });
    //     }
    //     return done(null, user);
    //   });
    // });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
});

const initializePassport = () => {
  return passport.initialize();
};

const sessionPassport = () => {
  return passport.session();
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = {
  initializePassport,
  sessionPassport,
  ensureAuthenticated
};
