const Author = require('../models/Author');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports = {
   getAuthors: async (req, res, next) => {
      try {
         const author = await Author.find()
         res.status(200).json(author)
      } catch(error) {
         res.status(500).json(error)
      }
   },
   newAuthor: async (req, res, next) => {
      try {
         const author = new Author(req.body);
         const addAuthor = await author.save()
         res.status(201).json(addAuthor);
      } catch(error) {
         res.status(500).json(error)
      }
   },
   getAuthor: async (req, res, next) => {
      try {
         const { authorId } = req.params;
         const author = await Author.findById(authorId).populate('posts');
         res.status(200).json(author)
      } catch(error) {
         res.status(500).json(error)
      }
   },
   updateAuthor: async (req, res, next) => {
      try {
         //Get the author
         const { authorId } = req.params;
         //Edit the author
         const editAuthor = req.body;
         //Save author 
         const result = await Author.findByIdAndUpdate(authorId, editAuthor);
         res.status(200).json({ success: true, result });
      } catch(error) {
         res.status(500).json(error)
      }
   },
   deleteAuthor: async (req, res, next) => {
      try {
         //Get the author
         const { authorId } = req.params;
         //Delete author
         const deleteAuthor = await Post.findByIdAndDelete(authorId)
         res.status(200).json({ success: true })
      } catch(error) {
         res.status(500).json(error)
      }
   }
}