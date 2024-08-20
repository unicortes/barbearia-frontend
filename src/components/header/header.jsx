import React from 'react';
import { Link } from 'react-router-dom';
import { BsScissors, BsHouse } from 'react-icons/bs'; // Ícone de casa (home)

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 shadow-md flex items-center">
            <div className="flex items-center flex-shrink-0">
                <BsScissors size={32} className="text-white" />
            </div>
            <nav className="flex-grow flex justify-center">
                <ul className="flex space-x-6 items-center">
                    <li className="flex items-center">
                        <BsHouse size={24} className="mr-2" /> {/* Ícone de home */}
                        <Link to="/pageHome" className="text-xl font-bold hover:text-gray-400">Home</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;