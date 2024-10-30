import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="absolute w-30 bg-white border-separate p-4 h-screen space-y-16 ">
            <h2 className="absolute text-xl text-gray-400  font-semibold mb-4 mt-4 ">Communities</h2>
            <ul>
                <li className="mb-2 ">
                    <Link to="/community1" className="text-black hover:underline">Community 1</Link>
                </li>
                <li className="mb-2">
                    <Link to="/community2" className="text-black hover:underline">Community 2</Link>
                </li>
                <li className="mb-2">
                    <Link to="/community3" className="text-black hover:underline">Community 3</Link>
                </li>
            </ul>
            <div className="mt-6">
                <h3 className="text-lg text-gray-400 font-semibold mb-6 ">Popular Posts</h3>
                <p className="text-black">Stay connected !</p>
            </div>
        </div>
    );
};

export default Sidebar;
