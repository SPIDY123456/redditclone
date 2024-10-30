const express = require('express');
const { register,verifyEmail,login, getUserProfile,} = require('../controllers/userController');
const { getPostsByNickname,commentOnPost,upvotePost,downvotePost,savePost, unsavePost, hidePost, unhidePost } = require('../controllers/userController');
const { protect } = require('../middlewares/authmiddleware')
const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);
router.get('/post/nickname/:nickname',protect, getPostsByNickname);
router.post('/:postId/comment',protect, commentOnPost);
router.post('/:postId/upvote',protect, upvotePost);
router.post('/:postId/downvote',protect, downvotePost)
router.put('/save/:postId', protect, savePost);       
router.put('/unsave/:postId', protect, unsavePost);  
router.put('/hide/:postId', protect, hidePost);       
router.put('/unhide/:postId', protect, unhidePost);   

module.exports = router;
