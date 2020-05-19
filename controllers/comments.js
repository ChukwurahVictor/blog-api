const Author = require('../models/Author');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports = {
   newComment: async (req, res, next) => {
      //Get the post
      const post = await Post.findById(req.body.post);
      //Create the comment
      const comment = await new Comment(req.body)
      //Push comment into post's 'comments' array
      post.comments.push(comment)
      await post.save()
      //Save the comment
      const newComment = await comment.save()
      res.status(201).json(newComment)
   },
   getComment: async (req, res, next) => {
      try {
         const { commentId } = req.params;
         const comment = await Comment.findById(commentId)
         res.status(200).json(comment)
      } catch(error) {
         res.status(500).json(error)
      }
   },
   updateComment: async (req, res, next) => {
      try {
         //Get the comment
         const { commentId } = req.params;
         //Edit the comment
         const newComment = req.body;
         //Save comment 
         const result = await Comment.findByIdAndUpdate(commentId, newComment);
         res.status(200).json({ success: true, result });
      } catch(error) {
         res.status(500).json(error)
      }
   },
   deleteComment: async (req, res, next) => {
      try {
         //Get the comment
         const { commentId } = req.params;
         //Delete comment
         const deletedPost = await Comment.findByIdAndDelete(commentId)
         res.status(200).json({ success: true })
      } catch(error) {
         res.status(500).json(error)
      }
   }
}