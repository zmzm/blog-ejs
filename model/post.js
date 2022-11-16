const mongoose = require('mongoose');
const postSchema = require('../schema/post');

const Post = mongoose.model('Blog', postSchema);

export default Post;
