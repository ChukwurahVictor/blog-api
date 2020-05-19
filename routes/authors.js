const router = require('express').Router();

const authorControllers = require('../controllers/authors');

router.route('/')
   .get(authorControllers.getAuthors)
   .post(authorControllers.newAuthor);

router.route('/:authorId')
   .get(authorControllers.getAuthor)
   .patch(authorControllers.updateAuthor)
   .delete(authorControllers.deleteAuthor);

module.exports = router;