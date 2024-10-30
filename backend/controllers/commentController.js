const asyncHandler = require('express-async-handler');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');


const createComment = asyncHandler(async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.postId);

        const newComment = new Comment({
            text,
            nickname: req.user.nickname,
            post: req.params.postId
        });

        await newComment.save();
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating the comment' });
    }
});

// Get comments for a post
const getComments = asyncHandler(async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error creating the comment'});
    }
});

const deleteComment = asyncHandler(async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        if (comment.nickname !== req.user.nickname) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await comment.deleteOne();
        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurs while deleting the comment' });
    }
});


module.exports = {createComment,getComments,deleteComment};