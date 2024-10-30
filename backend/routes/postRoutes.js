const express = require('express');

const {createPost, getPosts,upvotePost,getPostWithComments,downvotePost,deletePost} = require('../controllers/postController');

const {protect} = require('../middlewares/authmiddleware');

const router = express.Router();

router.post('/',protect,createPost);
router.get('/',getPosts);
router.get('/:postId', protect, getPostWithComments);
router.put('/:postId/upvote',protect,upvotePost);
router.put('/:postId/downvote',protect,downvotePost);
router.delete('/:postId',protect,deletePost);

module.exports = router;