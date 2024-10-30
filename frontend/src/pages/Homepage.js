import React, { useEffect, useState } from 'react';
import Feed from "../components/Feed";
import { getPosts,upvotePost,downvotePost} from '../api/postapi';


const HomePage = () => {
    
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    const handleUpvote = async (postId) => {
        try {
            const updatedPost = await upvotePost(postId);
            setPosts((prevPosts) =>
                prevPosts.map((post) => (post._id === postId ? updatedPost : post))
            );
        } catch (error) {
            console.error("Error upvoting post:", error);
        }
    };

    const handleDownvote = async (postId) => {
        try {
            const updatedPost = await downvotePost(postId);
            setPosts((prevPosts) =>
                prevPosts.map((post) => (post._id === postId ? updatedPost : post))
            );
        } catch (error) {
            console.error("Error downvoting post:", error);
        }
    };


    return (
        <div className="container mx-auto p-4 ">
            <Feed posts={posts} onUpvote={handleUpvote} onDownvote={handleDownvote} />
        </div>
    );
}

export default HomePage;
