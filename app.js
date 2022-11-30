const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const mwPassport = require('./middleware/passport');
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
mwPassport(passport);

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true });

app.get('/', homePage);
app.get('/about', aboutPage);
app.get('/contact', contactPage);
app.get(
  '/compose',
  passport.authenticate('local', { failureRedirect: '/login' }),
  composePage
);
app.post(
  '/compose',
  passport.authenticate('local', { failureRedirect: '/login' }),
  createPost
);
app.get('/posts/:postId', openPost);

app.get('/auth', authHomePage);
app.get('/login', loginPage);
app.post('/login', loginUser);
app.get('/register', registerPage);
app.post('/register', registerUser);

module.exports = app;
