
const express = require('express')

const  router = express.Router();
const postController = require('../controllers/postController')

router.route('/')
.get(postController.getAllPosts) // express automatically calls getAllPosts and supply (req, res, next) a
.post(postController.createPost)

router.route('/:id')
.get(postController.getPostById)
.put(postController.updatePost)
.delete(postController.deletePost)

module.exports = router;