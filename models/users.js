const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['client', 'talent'], // Define available roles
  }
});

// Hash password before saving
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      
      user.password = hash;
      next();
    });
  });
});

// Compare hashed password with plain text password
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User