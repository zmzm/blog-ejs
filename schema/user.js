const { Schema } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

require('dotenv').config();

const userSchema = new Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = userSchema;
