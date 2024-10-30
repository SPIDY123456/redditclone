import React from 'react';
import Post from './Post'; 

const Feed = ({ posts, onUpvote, onDownVote }) => {
    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post._id} 
                    post={post}
                    onUpvote={onUpvote}
                    onDownvote={onDownVote}
                />
            ))}
        </div>
    );
};

export default Feed;
