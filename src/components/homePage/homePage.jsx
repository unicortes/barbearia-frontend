import * as React from "react";
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Scissors, ClipboardList, Package, CreditCard, Megaphone } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center p-6">
      <div className="grid grid-cols-3 gap-6 w-full max-w-6xl">
        <Link to="/barber" className="w-full">
          <Card className="h-[180px] flex flex-col justify-between p-4">
            <CardHeader className="flex flex-col items-center flex-grow">
              <User className="text-gray-800 w-16 h-16" /> 
              <CardTitle className="mt-2 text-center text-lg font-semibold">Cadastrar Barbeiro</CardTitle>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/services" className="w-full">
          <Card className="h-[180px] flex flex-col justify-between p-4">
            <CardHeader className="flex flex-col items-center flex-grow">
              <Scissors className="text-gray-800 w-16 h-16" /> 
              <CardTitle className="mt-2 text-center text-lg font-semibold">Cadastrar Serviço</CardTitle>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/productStock" className="w-full">
          <Card className="h-[180px] flex flex-col justify-between p-4">
            <CardHeader className="flex flex-col items-center flex-grow">
              <ClipboardList className="text-gray-800 w-16 h-16" />
              <CardTitle className="mt-2 text-center text-lg font-semibold">Gerenciar Estoque</CardTitle>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/products" className="w-full">
          <Card className="h-[180px] flex flex-col justify-between p-4">
            <CardHeader className="flex flex-col items-center flex-grow">
              <Package className="text-gray-800 w-16 h-16" /> 
              <CardTitle className="mt-2 text-center text-lg font-semibold">Cadastrar Produto</CardTitle>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/loyaltyCards" className="w-full">
          <Card className="h-[180px] flex flex-col justify-between p-4">
            <CardHeader className="flex flex-col items-center flex-grow">
              <CreditCard className="text-gray-800 w-16 h-16" />
              <CardTitle className="mt-2 text-center text-lg font-semibold">Cadastrar Cartão de Fidelidade</CardTitle>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/sales" className="w-full">
          <Card className="h-[180px] flex flex-col justify-between p-4">
            <CardHeader className="flex flex-col items-center flex-grow">
              <Megaphone className="text-gray-800 w-16 h-16" />
              <CardTitle className="mt-2 text-center text-lg font-semibold">Promoções</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;