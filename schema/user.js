const { Schema } = require('mongoose');
const encrypt = require('mongoose-encryption');

require('dotenv').config();

const userSchema = new Schema({
  email: String,
  password: String,
});

const secKey = process.env.SECRET_KEY;
userSchema.plugin(encrypt, {
  secret: secKey,
  encryptedFields: ['password'],
});

module.exports = userSchema;
