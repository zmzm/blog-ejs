const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');

require('dotenv').config();

const saltFactor = Number.parseFloat(process.env.SALT_WORK_FACTOR);

const userSchema = new Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(saltFactor, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (hashingError, hash) => {
      if (hashingError) return next(hashingError);
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = userSchema;
