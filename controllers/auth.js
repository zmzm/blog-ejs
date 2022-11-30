const { get } = require('lodash/fp');
const User = require('../model/user');

const authHomePage = async (req, res) => {
  res.render('auth');
};

const loginPage = async (req, res) => {
  res.render('login');
};

const loginUser = async (req, res) => {
  const user = get(['body'], req);
  User.findOne({ email: user.email }, (err, foundUser) => {
    if (err || !foundUser) {
      return null;
    }

    foundUser.comparePassword(user.password, (comparationError, isMatch) => {
      if (comparationError) {
        return null;
      }

      if (isMatch) {
        res.redirect('/');
      }
    });
  });
};

const registerPage = async (req, res) => {
  res.render('register');
};

const registerUser = async (req, res) => {
  const user = get(['body'], req);
  const newUser = new User(user);

  newUser.save((err) => {
    if (!err) {
      res.redirect('/');
    }
  });
};

module.exports = {
  authHomePage,
  loginPage,
  loginUser,
  registerPage,
  registerUser,
};
