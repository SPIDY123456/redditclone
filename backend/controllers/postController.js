const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const User = require('../models/User');
const Comments = require('../models/Comment');
// Create a new post
const createPost = asyncHandler(async (req, res) => {
    try {
        const { title, body } = req.body;

        // Create a new post
        const newPost = new Post({ title, body, user: req.user.id });
        await newPost.save();

        // Find the user and update their posts array
        const user = await User.findById(req.user.id);
        user.posts.push(newPost._id); // Add the new post ID to the user's posts array
        await user.save(); // Save the user document with the updated posts

        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating the post' });
    }
});


const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'nickname').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get the post' });
    }
});

const getPostWithComments = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('comments');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching the post' });
    }
});


const upvotePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post.upvotes.includes(req.user.id)) {
            return res.status(400).json({ message: 'You have already upvoted this post' });
        }
        post.upvotes.push(req.user.id);
        post.downvotes = post.downvotes.filter((id) => id.toString() !== req.user.id);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error upvoting'});
    }
});

// Downvote a post
const downvotePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post.downvotes.includes(req.user.id)) {
            return res.status(400).json({ message: 'You have already downvoted this post' });
        }
        post.downvotes.push(req.user.id);
        post.upvotes = post.upvotes.filter((id) => id.toString() !== req.user.id);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to downvote the post'});
    }
});

// Delete a post
const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted Successfully'  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error deleting the posts' });
    }
});

module.exports= {createPost,getPosts,getPostWithComments,upvotePost,downvotePost,deletePost};


