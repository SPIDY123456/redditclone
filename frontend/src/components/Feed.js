import React from 'react';
import Post from './Post'; // Assuming you have a Post component for displaying individual posts

const Feed = ({ posts, onUpvote, onDownVote }) => {
    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post._id} // Ensure you're using the correct unique identifier
                    post={post}
                    onUpvote={onUpvote}
                    onDownvote={onDownVote}
                />
            ))}
        </div>
    );
};

export default Feed;
