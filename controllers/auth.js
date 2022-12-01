const { get } = require('lodash/fp');
const User = require('../model/user');

const authHomePage = async (req, res) => {
  res.render('auth');
};

const loginPage = async (req, res) => {
  res.render('login');
};

const loginUser = async (req, res, passport) => {
  const user = get(['body'], req);
  req.login(user, (err) => {
    if (err) {
      res.redirect('/login');
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/compose');
      });
    }
  });
};

const registerPage = async (req, res) => {
  res.render('register');
};

const registerUser = async (req, res, passport) => {
  const user = get(['body'], req);

  User.register({ email: user.email }, user.password, (err) => {
    if (err) {
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/compose');
      });
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
