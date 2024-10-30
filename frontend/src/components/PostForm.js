import React, { useState } from 'react';
import { createPost } from '../api/postapi';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPost = await createPost(title, body);
            onPostCreated && onPostCreated(newPost);
            setTitle('');
            setBody('');

        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handlehome = () => {
        navigate('/');
    }
    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 max-w-xl h-60 mt-28  mx-auto shadow-md rounded-md p-4 mb-4">
            <h1 className='absolute text-left -mt-24 font-bold text-lg text-black'>Create Post</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full mb-2 p-2 border rounded"
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Body"
                className="w-full mb-12  p-2 border rounded"
            ></textarea>
            <div className='flex justify-center'>
            <button type="submit" className="bg-blue-500 w-28 text-white  hover:bg-blue-600 px-4 py-2 rounded">Submit</button>
            </div>
        </form>
        
    );
}

export default PostForm;
