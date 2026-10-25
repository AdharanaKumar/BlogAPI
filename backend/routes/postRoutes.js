
const express = require('express')
const  router = express.Router();
const postController = require('../controllers/postController')
const protect = require('../middleware/protect');

router.route('/')
.get(postController.getAllPosts) // express automatically calls getAllPosts and supply (req, res, next) a
.post(postController.createPost)

router.route('/:id')
    .get(postController.getPostById)
    .put(protect.canUpdatePost, postController.updatePost)
    .delete(protect.canDeletePost, postController.deletePost)
router.route('/author/:id')
    .get(postController.getPostByAuthorId)

module.exports = router;