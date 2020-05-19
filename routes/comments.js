const router = require('express').Router();

const commentControllers = require('../controllers/comments');

router.route('/')
   .post(commentControllers.newComment)

router.route('/:commentId')
   .get(commentControllers.getComment)
   .patch(commentControllers.updateComment)
   .delete(commentControllers.deleteComment)

module.exports = router;