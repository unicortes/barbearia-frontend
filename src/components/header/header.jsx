import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsList, BsHouse } from 'react-icons/bs';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className="bg-gray-800 text-white p-4 shadow-md flex items-center">
                <div className="flex items-center flex-shrink-0">
                    <BsList size={32} className="text-white cursor-pointer" onClick={toggleMenu} />
                </div>
                <nav className="flex-grow flex justify-center">
                    <ul className="flex space-x-6 items-center">
                        <li className="flex items-center">
                            <BsHouse size={24} className="mr-2" />
                            <Link to="/pageHome" className="text-xl font-bold hover:text-gray-400">Home</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Menu Lateral */}
            <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 shadow-lg transform transition-transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ width: '250px' }}>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-white text-2xl font-bold">Menu</h1>
                <button className="text-white text-2xl" onClick={toggleMenu}>×</button>
            </div>
            <nav className="space-y-2">
                <Link to="/barber" className="text-white block p-2 rounded hover:bg-gray-700">Cadastrar Barbeiro</Link>
                <Link to="/services" className="text-white block p-2 rounded hover:bg-gray-700">Cadastrar Serviço</Link>
                <Link to="/productStock" className="text-white block p-2 rounded hover:bg-gray-700">Gerenciar Estoque</Link>
                <Link to="/products" className="text-white block p-2 rounded hover:bg-gray-700">Cadastrar Produto</Link>
                <Link to="/clients" className="text-white block p-2 rounded hover:bg-gray-700">Cadastrar Cliente</Link>
                <Link to="/loyaltyCard" className="text-white block p-2 rounded hover:bg-gray-700">Cadastrar Cartão de Fidelidade</Link>
                <Link to="/sales" className="text-white block p-2 rounded hover:bg-gray-700">Promoções</Link>
            </nav>
            </div>

        </>
    );
};

export default Header;