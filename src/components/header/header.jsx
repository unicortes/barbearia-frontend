import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BsList, BsHouse, BsPerson } from 'react-icons/bs';
import Modal from 'react-modal';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar o modal
    const navigate = useNavigate(); 
    const location = useLocation(); // Obtém a rota atual

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        navigate('/authentication');
        console.log('Usuário deslogado');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmLogout = () => {
        handleLogout();
        closeModal();
    };

    const userRole = localStorage.getItem('userRole');

    // Verifica se a rota atual é a de login
    if (location.pathname === '/authentication') {
        return null;
    }

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
                {/* Perfil e Logout */}
                <div className="ml-auto relative">
                    <BsPerson size={24} className="text-white cursor-pointer hover:text-gray-400" onClick={openModal} />
                </div>
            </header>

            {/* Menu Lateral */}
            <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 shadow-lg transform transition-transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ width: '250px' }}>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-white text-2xl font-bold">Menu</h1>
                    <button className="text-white text-2xl" onClick={toggleMenu}>×</button>
                </div>
                <nav className="space-y-2">
                    {userRole === 'admin' && (
                        <>
                            <Link to="/barber" className="text-white block p-2 rounded hover:bg-gray-700">Gerenciar Barbeiros</Link>
                            <Link to="/services" className="text-white block p-2 rounded hover:bg-gray-700">Gerenciar Serviços</Link>
                            <Link to="/productStock" className="text-white block p-2 rounded hover:bg-gray-700">Gerenciar Estoque</Link>
                            <Link to="/products" className="text-white block p-2 rounded hover:bg-gray-700">Cadastrar Produto</Link>
                            <Link to="/loyaltyCards" className="text-white block p-2 rounded hover:bg-gray-700">Cadastrar Cartão de Fidelidade</Link>
                            <Link to="/sales" className="text-white block p-2 rounded hover:bg-gray-700">Promoções</Link>
                        </>
                    )}
                    {userRole === 'client' && (
                        <Link to="/services" className="text-white block p-2 rounded hover:bg-gray-700">Ver Serviços</Link>
                    )}
                </nav>
            </div>

            {/* Modal de Confirmação */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirmar Logout"
                className="flex items-center justify-center bg-gray-900 text-white p-8 rounded-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75"
            >
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl mb-4">Deseja sair?</h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={confirmLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Sim
                        </button>
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Não
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Header;