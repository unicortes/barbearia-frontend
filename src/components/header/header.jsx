import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BsList, BsPeople as BsBarber, BsBasket as BsProductStock, BsScissors as BsService, BsScissors, BsCalendar3Week as BsAppointments,
  BsTag, BsCardChecklist, BsCart as BsProduct, BsPerson, BsClipboardData as BsHistorys, BsClockHistory as BsAvaliableTime
} from "react-icons/bs";
import Modal from "react-modal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/authentication");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const confirmLogout = () => {
    handleLogout();
    closeModal();
  };

  const userRole = localStorage.getItem("userRole");

  if (location.pathname === "/authentication" || !isAuthenticated) {
    return null;
  }

  return (
    <>
      <header className="bg-gray-800 text-white p-4 shadow-md flex items-center">
        <div className="flex items-center flex-shrink-0">
          <BsList
            size={32}
            className="text-white cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <nav className="flex-grow flex justify-center">
          <ul className="flex space-x-6 items-center">
            <li className="flex items-center">
              <BsScissors size={24} className="mr-2" />
              <Link to="/pageHome" className="text-xl font-bold hover:text-gray-400">
                UniCortes
              </Link>
            </li>
          </ul>
        </nav>
        <div className="ml-auto relative">
          <BsPerson
            size={24}
            className="text-white cursor-pointer hover:text-gray-400"
            onClick={openModal}
          />
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 shadow-lg transform transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-2xl font-bold">Menu</h1>
          <button className="text-white text-2xl" onClick={toggleMenu}>
            ×
          </button>
        </div>
        <nav className="space-y-2">
          {userRole === "ADMIN" && (
            <>
              <Link to="/barber" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsBarber className="mr-2" />
                Barbeiros
              </Link>
              <Link to="/clients" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsPerson className="mr-2" />
                Cliente
              </Link>
              <Link to="/appointments" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsAppointments className="mr-2" />
                Agendamentos
              </Link>
              <Link to="/services" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsService className="mr-2" />
                Serviços
              </Link>
              <Link to="/productStock" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsProductStock className="mr-2" />
                Estoque
              </Link>
              <Link to="/products" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsProduct className="mr-2" />
                Produtos
              </Link>
              <Link to="/loyaltyCards" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsCardChecklist className="mr-2" />
                Cartões de Fidelidade
              </Link>
              <Link to="/promotions" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsTag className="mr-2" />
                Promoções
              </Link>
              <Link to="/historys" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsHistorys className="mr-2" />
                Histórico de Agendamentos
              </Link>
            </>
          )}
          {userRole === "BARBER" && (
            <>
              <Link to="/appointments" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsAppointments className="mr-2" />
                Agendamentos
              </Link>
              <Link to="/historys" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsHistorys className="mr-2" />
                Histórico de Agendamentos
              </Link>
              <Link to="/productStock" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsProductStock className="mr-2" />
                Estoque
              </Link>
              <Link to="/services" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsService className="mr-2" />
                Serviços
              </Link>
              <Link to="/avaliable-time" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
                <BsAvaliableTime className="mr-2" />
                Horário de Atendimento
              </Link>
            </>
          )}
          {userRole === "CLIENT" && (
            <Link to="/appointment" className="text-white block p-2 rounded hover:bg-gray-700 flex items-center">
              <BsAppointments className="mr-2" />
              Agendar Serviços
            </Link>
          )}
        </nav>
      </div>

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