const router = require('express').Router();

const postControllers = require('../controllers/posts');

router.route('/')
   .get(postControllers.index)
   .post(postControllers.newPost);

router.route('/:postId')
   .get(postControllers.getPost)
   .patch(postControllers.updatePost)
   .delete(postControllers.deletePost);

module.exports = router;