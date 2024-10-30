import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSignInAlt, FaUser, FaBell, FaComments } from 'react-icons/fa'; // Import icons

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-white text-xl font-semibold">Reddit Clone</Link>
                <div className="flex items-center">
                    <Link to="/create-post" className="text-white px-4 flex items-center">
                        <FaPlus className="mr-2" />
                        Create
                    </Link>
                    <Link to="/login" className="text-white px-4 flex items-center">
                        <FaSignInAlt className="mr-2" />
                        Login
                    </Link>
                    <Link to="/profile" className="text-white px-4 flex items-center">
                        <FaUser className="mr-2" />
                    </Link>
                    <Link to="/notifications" className="text-white px-4 flex items-center">
                        <FaBell className="mr-2" />
                    </Link>
                    <Link to="/chat" className="text-white px-4 flex items-center">
                        <FaComments className="mr-2" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
