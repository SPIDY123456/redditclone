const express = require('express');
const {createComment, getComments, deleteComment} = require('../controllers/commentController');
const {protect} = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/:postId',protect,createComment);
router.get('/:postId',getComments);
router.delete("/:postId/comments/:commentId", protect, deleteComment); // Ensure you have postId in route


module.exports = router;
