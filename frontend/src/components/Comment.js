import React, { useEffect, useState } from 'react';
import { getComments, createComment, deleteComment, upvoteComment, downvoteComment } from '../api/commentapi';
import moment from "moment";

const Comment = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getComments(postId);
                setComments(data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) {
            console.error("Comment text cannot be empty");
            return;
        }
        try {
            const newComment = await createComment(postId, commentText);
            setComments([newComment, ...comments]);
            setCommentText('');
        } catch (error) {
            console.error(`Error creating comment: ${error.message}`);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId);
            setComments(comments.filter((comment) => comment._id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleUpvote = async (commentId) => {
        try {
            const updatedComment = await upvoteComment(commentId);
            setComments(comments.map(comment => comment._id === commentId ? updatedComment : comment));
        } catch (error) {
            console.error("Error upvoting comment:", error);
        }
    };

    const handleDownvote = async (commentId) => {
        try {
            const updatedComment = await downvoteComment(commentId);
            setComments(comments.map(comment => comment._id === commentId ? updatedComment : comment));
        } catch (error) {
            console.error("Error downvoting comment:", error);
        }
    };

    return (
        <div className="mt-4 ">
            <form onSubmit={handleCommentSubmit} className='flex-items-center'>
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment"
                    className="w-60 text-[12px] mr-20 h-12 text-12 p-2 border border-gray-300 rounded-full mb-2"
                />
                <button type="submit" className=" bg-blue-500 -ml-16 text-white px-4 py-2 w-26 mt-1 rounded">Comment</button>
            </form>
            <ul className="mt-4">
                {comments.map((comment) => (
                    <li key={comment._id} className="border-b border-gray-200 p-2">
                        <div className="flex justify-b">
                            <button onClick={() => handleUpvote(comment._id)} className="text-green-500">
                                ↑
                            </button>
                            <span className="mx-2"></span>
                            <button onClick={() => handleDownvote(comment._id)} className="text-red-500">
                                ↓
                            </button>
                            <span className="mx-2"></span>
                        </div>
                        <div className="flex flex-col -ml-4">
                            <p>{comment.nickname} •</p>
                            <p className="text-xs text-gray-500 -mt-5 ml-48 mb-6">{moment(comment.createdAt).fromNow()}</p>
                            <p className="text-md text-black mb-4">{comment.text}</p>
                            <button onClick={() => handleDeleteComment(comment._id)} className="absolute text-red-500 mt-11 ml-80 hover:underline">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comment;
