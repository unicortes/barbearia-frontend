import React from 'react';
import { Link } from 'react-router-dom';
import { BsScissors } from "react-icons/bs";

const Header = () => {
    return (
        <header className="bg-black text-white p-4 shadow-md flex items-center">
            <div className="flex items-center flex-shrink-0">
                <BsScissors size={32} />
            </div>
            <nav className="flex-grow flex justify-center">
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/pageHome" className="hover:text-gray-400">Home</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
