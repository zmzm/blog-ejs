const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const {
  homePage,
  aboutPage,
  contactPage,
  composePage,
  openPost,
  createPost,
} = require('./controllers/common');
const {
  authHomePage,
  loginPage,
  loginUser,
  registerPage,
  registerUser,
} = require('./controllers/auth');
const User = require('./model/user');
const checkAuthenticated = require('./middleware/authCheck');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true });

app.get('/', homePage);
app.get('/about', aboutPage);
app.get('/contact', contactPage);
app.get('/compose', checkAuthenticated, composePage);
app.post('/compose', checkAuthenticated, createPost);
app.get('/posts/:postId', openPost);

app.get('/auth', authHomePage);
app.get('/login', loginPage);
app.post('/login', (req, res) => loginUser(req, res, passport));
app.get('/register', registerPage);
app.post('/register', (req, res) => registerUser(req, res, passport));

module.exports = app;
