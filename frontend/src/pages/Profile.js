import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FiLogOut} from "react-icons/fi"
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({
        nickname: '',
        posts: [],
        commentPosts: [],
        savedPosts: [],
        hiddenPosts: [],
        commentPosts: [],
        upvotedPosts: [],
        downvotedPosts: []
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            
                setUser({
                    nickname: response.data.nickname || '',
                    posts: response.data.posts || [],
                    commentPosts: response.data.commentPosts || [],
                    savedPosts: response.data.savedPosts || [],
                    hiddenPosts: response.data.hiddenPosts || [],
                    commentPosts: response.data.commentPosts || [],
                    upvotedPosts: response.data.upvotedPosts || [],
                    downvotedPosts: response.data.downvotedPosts || []
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

   
    const handleHome = () => {
        navigate('/'); // Navigate to the dashboard
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="max-w-screen-2xl mx-auto p-4">
            <div className="bg-white min-h-[48rem] shadow-xl rounded-xl ml-60   p-12">
                <h1 className="text-2xl text-black font-semibold text-left">{user.nickname}</h1>

                {/* Overview Section */}
                <div className="mt-8 p-4 border-t border-gray-200">
                    <h2 className="text-2xl text-center text-gray-700 font-bold mb-12">Overview</h2>
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-lg text-gray-600">Posts</h3>
                            <p className='text-center'>{user.posts.length || 0}</p>
                        </div>
                        <div>
                            <h3 className="text-lg text-gray-600">Comments</h3>
                            <p className='text-center'>{user.commentPosts.length || 0}</p>
                        </div>
                        <div>
                            <h3 className="text-lg text-gray-600">Saved</h3>
                            <p className='text-center'>{user.savedPosts.length || 0}</p>
                        </div>
                        <div>
                            <h3 className="text-lg text-gray-600">Hidden</h3>
                            <p className='text-center'>{user.hiddenPosts.length || 0}</p>
                        </div>
                        <div>
                            <h3 className="text-lg text-gray-600">Upvoted</h3>
                            <p className='text-center'>{user.downvotedPosts.length || 0}</p>
                        </div>
                        <div>
                            <h3 className="text-lg text-gray-600">Downvoted</h3>
                            <p className='text-center'>{user.downvotedPosts.length || 0}</p>
                        </div>
                    </div>
                </div>

                <ul>
                <li className="flex justify-between items-center absolute mt-20 cursor-pointer" onClick={handleSignOut}>
                    <div className="flex items-center">
                        <FiLogOut className="mr-2" /> {/* Add margin for spacing */}
                        <span className="text-gray-700">Log Out</span>
                    </div>
                    <span className="text-gray-400">    </span>
                </li>
                </ul>



                {/* <div className="mt-8 p-4  border-t border-gray-200">
                    <h2 className="text-xl text-gray-700 font-bold mb-4">Comments</h2>
                    {user.commentPosts.length > 0 ? (
                        user.commentPosts.map(comment => (
                            <div key={comment._id} className="border-b border-gray-300 mb-2">
                                <p>{comment._id}</p>
                            </div>
                        ))
                    ) : (
                        <p>{user.nickname} hasn't commented yet.</p>
                    )}
                </div> */}

                {/* User Upvoted Posts Section
                <div className="mt-8 p-4 border-t border-gray-200">
                    <h2 className="text-xl text-gray-700 font-bold mb-4">Upvoted Posts</h2>
                    {user.upvotedPosts.length > 0 ? (
                        user.upvotedPosts.map(item => (
                            <div key={item._id} className="border-b border-gray-300 mb-2">
                                <p>{user.upvotedPosts._id}</p>
                            </div>
                        ))
                    ) : (
                        <p>{user.nickname} has no upvoted posts.</p>
                    )}
                </div> */}

              

                


                {/* User Downvoted Posts Section */}
                {/* <div className="mt-8 p-4 border-t border-gray-200">
                    <h2 className="text-xl text-gray-700 font-bold mb-4">Downvoted Posts</h2>
                    {user.downvotedPosts.length > 0 ? (
                        user.downvotedPosts.map(item => (
                            <div key={item._id} className="border-b border-gray-300 mb-2">
                                <p>{item.title}</p>
                            </div>
                        ))
                    ) : (
                        <p>{user.nickname} has no downvoted posts.</p>
                    )}
                </div> */}

                <div className='flex justify-center mt-40'>
                    <button
                        onClick={handleHome}
                        className="bg-blue-800 ml-8  text-white font-semibold mt-40 py-2 px-4 rounded-full hover:bg-blue-900 transition duration-200 flex items-center space-x-2"
                    >
                        <span>Home</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
