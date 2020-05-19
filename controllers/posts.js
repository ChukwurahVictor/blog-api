const Author = require('../models/Author');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports = {
   index: async (req, res, next) => {
      try {
         const post = await Post.find()
         res.status(200).json(post)
      } catch (error) {
         res.status(500).json(error)
      }
   },
   
   newPost: async (req, res, next) => {
      try {
         //Get the author
         const author = await Author.findById(req.body.author);
         //Create the post
         const post = new Post(req.body)
         //Push post to author's 'posts' array
         author.posts.push(post)
         await author.save();
         //Save the created post
         const addedPost = await post.save()
         res.status(201).json(addedPost)
      } catch(error) {
         res.status(500).json(error)
      }
   },
   getPost: async (req, res, next) => {
      try {
         const { postId } = req.params;
         const post = await Post.findById(postId).populate('author comments');
         res.status(200).json(post)
      } catch(error) {
         res.status(500).json(error)
      }
   },
   updatePost: async (req, res, next) => {
      try {
         //Get the post
         const { postId } = req.params;
         //Edit the post
         const newPost = req.body;
         //Save post 
         const result = await Post.findByIdAndUpdate(postId, newPost);
         res.status(200).json({ success: true, result });
      } catch(error) {
         res.status(500).json(error)
      }
   },
   deletePost: async (req, res, next) => {
      try {
         //Get the post
         const { postId } = req.params;
         //Delete post
         const deletedPost = await Post.findByIdAndDelete(postId)
         res.status(200).json({ success: true })
      } catch(error) {
         res.status(500).json(error)
      }
   }
}