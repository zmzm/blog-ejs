const { get } = require('lodash/fp');

const Post = require('../model/post');

const homeStartingContent =
  'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent =
  'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent =
  'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const homePage = async (req, res) => {
  const posts = await Post.find({});
  res.render('home', { content: homeStartingContent, posts });
};

const aboutPage = async (req, res) => {
  res.render('about', { content: aboutContent });
};

const contactPage = async (req, res) => {
  res.render('contact', { content: contactContent });
};

const composePage = async (req, res) => {
  res.render('compose');
};

const createPost = async ({ body: { postTitle, postBody } }, res) => {
  const post = { title: postTitle, content: postBody };
  const newPost = new Post(post);
  newPost.save((err) => {
    if (!err) {
      res.redirect('/');
    }
  });
};

const openPost = async (req, res) => {
  const postId = get(['params', 'postId'], req);
  const foundPost = await Post.findById(postId).exec();

  if (foundPost) {
    res.render('post', { post: foundPost });
  }
};

module.exports = {
  homePage,
  aboutPage,
  contactPage,
  composePage,
  openPost,
  createPost,
};
