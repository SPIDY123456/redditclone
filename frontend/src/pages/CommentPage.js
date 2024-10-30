import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from '../components/Comment'; // Import the Comment component

const CommentPage = () => {
    const { postId } = useParams(); 
    const navigate = useNavigate(); 
    useEffect(() => {
        
    }, [postId]);

    return (
        <div className="container mx-auto p-4 ml-96">
          
            <Comment postId={postId} /> 
            <button
                className="mt-4 bg-gray-300 p-2 rounded"
                onClick={() => navigate('/')} 
            >
                Back
            </button>
        </div>
    );
};

export default CommentPage;
