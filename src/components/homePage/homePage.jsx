import * as React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Menu, X } from 'lucide-react';
import { User, Scissors, ClipboardList, Package, CreditCard } from 'lucide-react';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 w-64 p-4`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-bold">Menu</h2>
          <button onClick={toggleSidebar} className="text-white p-2 rounded hover:bg-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-2">
          <Link to="/barber" className="text-white block p-2 rounded hover:bg-gray-700">Cadastrar Barbeiro</Link>
          <Link to="/services" className="text-white block p-2 rounded hover:bg-gray-700">Cadastrar Serviço</Link>
          <Link to="/productStock" className="text-white block p-2 rounded hover:bg-gray-700">Gerenciar Estoque</Link>
          <Link to="/products" className="text-white block p-2 rounded hover:bg-gray-700">Cadastrar Produto</Link>
          <Link to="/loyaltyCards" className="text-white block p-2 rounded hover:bg-gray-700">Cadastrar Cartão de Fidelidade</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <header className="p-4">
          <button onClick={toggleSidebar} className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700">
            <Menu className="w-6 h-6" />
          </button>
        </header>
        <div className="flex flex-wrap gap-6 p-6">
          <Link to="/barber" className="w-[250px]">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <User className="text-gray-800 w-12 h-12" /> 
                <CardTitle>Cadastrar Barbeiro</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/services" className="w-[250px]">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Scissors className="text-gray-800 w-12 h-12" /> 
                <CardTitle>Cadastrar Serviço</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/productStock" className="w-[250px]">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <ClipboardList className="text-gray-800 w-12 h-12" />
                <CardTitle>Gerenciar Estoque</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/products" className="w-[250px]">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Package className="text-gray-800 w-12 h-12" /> 
                <CardTitle>Cadastrar Produto</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/loyaltyCards" className="w-[250px]">
            <Card>
              <CardHeader className="flex flex-col items-center text-center">
                <CreditCard className="text-gray-800 w-12 h-12" />
                <CardTitle>Cadastrar Cartão de Fidelidade</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;