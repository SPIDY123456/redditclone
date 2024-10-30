import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = `https://redditclone-ijh8.onrender.com`; 

const Login = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${API_URL}/api/user/login`, { nickname, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            localStorage.setItem('token', data.token);
            alert('Login Successful');
            navigate('/'); 
        } catch (error) {
            console.error('Error logging in', error);   
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-indigo-500">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Login to your account</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block text-gray-700 font-medium mb-2">Nickname</label>
                    <input
                        type="text"
                        placeholder="Enter your nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <button className="bg-indigo-600 text-white py-3 w-full rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out font-semibold">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
