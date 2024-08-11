import React from 'react';
import { BsScissors } from "react-icons/bs";

const Header = () => {
    return (
        <header className={("bg-black text-white p-4 shadow-md items-center flex font-medium")}>
            <BsScissors size={32} />
            <div className="container mx-auto flex justify-center items-center">
            
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:text-gray-400">Home</a></li>
                        <li><a href="#" className="hover:text-gray-400">Sobre</a></li>
                        <li><a href="#" className="hover:text-gray-400">Serviços</a></li>
                        <li><a href="#" className="hover:text-gray-400">Contato</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;