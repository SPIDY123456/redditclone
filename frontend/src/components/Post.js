    import React from 'react';
    import moment from 'moment';
    import {useNavigate} from "react-router-dom"
    import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa'; 

    const Post = ({post, onUpvote, onDownvote }) => {
        const navigate= useNavigate();


        

        return (
            <div className="bg-white w-xl md:w-5/10 lg:w-85 shadow-md rounded-md ml-40 p-4 mb-8">
                <p className="text-md text-black font-semibold">{post.user.nickname} •</p>
                <p className="absolute text-xs text-gray-500 ml-48 -mt-4 mb-12">{moment(post.createdAt).fromNow()}</p>
                <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
                <p className="text-gray-700 mt-8">{post.body}</p>

                <div className="flex items-center mt-8">
                    <div className="flex items-center bg-gray-200 rounded-full p-2">
                        <button
                            onClick={() => onUpvote(post._id)}
                            className="flex items-center justify-center w-10 h-10 bg-gray-400 text-white rounded-full hover:bg-gray-600 transition"
                        >
                            <FaArrowUp />
                        </button>
                        <span className="text-gray-700 mx-2">{post.upvotes.length}</span>
                        <button
                            onClick={() => onDownvote(post._id)}
                            className="flex items-center justify-center w-10 h-10 bg-gray-400 text-white rounded-full hover:bg-gray-600 transition"
                        >
                            <FaArrowDown />
                        </button>
                        <span className="text-gray-700 mx-2">{post.downvotes.length}</span>
                    </div>
                    <div className="flex items-center ml-4">
                        <button className="flex items-center text-gray-500 hover:text-blue-500 rounded-full transition" onClick={() => {navigate('/comments/:postId')}}>
                            <FaComment />
                            <span className="ml-1">{post.comments.length}</span> {/* Display the number of comments */}
                        </button>
                        
                    </div>
                </div>
            </div>
        );
    }




    export default Post;
