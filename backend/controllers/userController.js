const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '60d' });
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY);

const register = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const verificationCode = crypto.randomBytes(3).toString('hex'); // Use 'verificationCode' here
    const user = await User.create({ email, verificationCode }); // Change to 'verificationCode'

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'diwarock2000@gmail.com',
        subject: "EMAIL VERIFICATION",
        text: `Your verification code is ${verificationCode}`, // Use 'verificationCode' here
    };

    console.log('Verification Code sent:', verificationCode);

    try {
        await sgMail.send(mailOptions);
        // Send a response after sending the email
        return res.status(201).json({ message: 'Verification code successfully sent to the mail' });
    } catch (error) {
        console.error(`Error ${error.message}`);
        return res.status(500).json({ message: 'Error sending verification code' });
    }
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { email, verificationCode, nickname, password } = req.body; // Ensure 'verificationCode' is used here

    const user = await User.findOne({ email });
    // Check if user exists and if the verification code matches
    if (!user || user.verificationCode !== verificationCode) { // Use 'verificationCode' here
        return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.nickname = nickname;
    user.password = password;
    user.verificationCode = undefined; // Clear verification code
    await user.save();

    res.json({ message: 'Registration successful', token: generateToken(user._id) });
});

const login = asyncHandler(async (req, res) => {
    const { nickname, password } = req.body;

    // Check for the user
    const user = await User.findOne({ nickname });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            nickname: user.nickname,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('posts'); 

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({
        _id: user._id,
        nickname:user.nickname,
        email: user.email,       
        commentPosts : user.commentPosts,
        posts:user.posts,
        savedPosts: user.savedPosts,
        hiddenPosts: user.hiddenPosts,
        upvotedPosts: user.upvotedPosts,
        downvotedPosts :user.downvotedPosts,
    });
});

const savePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const user = req.user;

    if (!user.savedPosts.includes(postId)) {
        user.savedPosts.push(postId);
        await user.save();
        res.json({ message: 'Post saved successfully' });
    } else {
        res.status(400).json({ message: 'Post already saved' });
    }
});

const commentOnPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const user = req.user;

    // Check if postId is valid
    if (!postId) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }

    if (!user.commentPosts.includes(postId)) {
        user.commentPosts.push(postId);
        await user.save();
        res.json({ message: 'Comment added successfully' });
    } else {
        res.status(400).json({ message: 'Comment already added' });
    }
});

const upvotePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const user = req.user;

    if (!postId) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }

    if (!user.upvotedPosts.includes(postId)) {
        user.upvotedPosts.push(postId);
        await user.save();
        res.json({ message: 'Post upvoted successfully' });
    } else {
        res.status(400).json({ message: 'Post already upvoted' });
    }
});

const downvotePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const user = req.user;

    if (!postId) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }

    if (!user.downvotedPosts.includes(postId)) {
        user.downvotedPosts.push(postId);
        await user.save();
        res.json({ message: 'Post downvoted successfully' });
    } else {
        res.status(400).json({ message: 'Post already downvoted' });
    }
});

const unsavePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const user = req.user;

    user.savedPosts = user.savedPosts.filter(id => id.toString() !== postId);
    await user.save();

    res.json({ message: 'Post unsaved successfully' });
});

const hidePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const user = req.user;

    if (!user.hiddenPosts.includes(postId)) {
        user.hiddenPosts.push(postId);
        await user.save();
    }

    res.json({ message: 'Post hidden successfully' });
});

const unhidePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const user = req.user;

    user.hiddenPosts = user.hiddenPosts.filter(id => id.toString() !== postId);
    await user.save();

    res.json({ message: 'Post unhidden successfully' });
});

const getPostsByNickname = asyncHandler(async (req, res) => {
    const { nickname } = req.params;

    // Find the user by nickname
    const user = await User.findOne({ nickname });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Find posts associated with the user
    const posts = await Post.find({ user: user._id });
    res.json(posts);
})

module.exports = {
    register,
    verifyEmail,
    login,
    getUserProfile,
    commentOnPost,
    savePost,
    upvotePost,
    downvotePost,
    unsavePost,
    hidePost,
    unhidePost,
    getPostsByNickname,
};
