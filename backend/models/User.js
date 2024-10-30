const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    nickname: { type: String,  unique: true },
    password: { type: String },
    verificationCode: { type: String }, 
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    hiddenPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    commentPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], 
    upvotedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], 
    downvotedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], 
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);
