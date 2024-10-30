import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import Sidebar from '../components/Sidebar';
import { getPosts, createPost } from "../api/postapi";

const CommunityPage = () => {
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

    const handlePostCreated = async (title, body) => {
        try {
            const newPost = await createPost(title, body);
            setPosts([newPost, ...posts]);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="container mx-auto p-4">
                <PostForm onPostCreated={handlePostCreated} />
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default CommunityPage;
