import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, CreditCard, Megaphone, Package, Scissors, User } from 'lucide-react';
import { FaCalendarAlt, FaClock, FaHistory } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const userRole = localStorage.getItem('role'); // Obtém o papel do usuário
  
  return (
    <div className="flex flex-col items-center p-6">
      <div className="grid grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Mudar para admin quando estiver tudo implementado */}
        {userRole === null && (
          <>
            <Link to="/barber" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <User className="text-gray-800 w-16 h-16" /> 
                  <CardTitle className="mt-2 text-center text-lg font-semibold">Gerenciar Barbeiros</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/services" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <Scissors className="text-gray-800 w-16 h-16" /> 
                  <CardTitle className="mt-2 text-center text-lg font-semibold">Gerenciar Serviços</CardTitle>
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
                  <CardTitle className="mt-2 text-center text-lg font-semibold">Gerenciar Produtos</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/clients" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <User className="text-gray-800 w-16 h-16" /> 
                  <CardTitle className="mt-2 text-center text-lg font-semibold">Cadastrar Cliente</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/loyaltyCards" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <CreditCard className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">Gerenciar Cartões de Fidelidade</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/sales" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <Megaphone className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">Gerenciar Promoções</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/avaliable-time" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <FaClock className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">Gerenciar Horários</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/appointment" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <FaCalendarAlt className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">Agendamento</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/appointments" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <FaCalendarAlt className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">Agendamentos</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/manege-appointments" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <FaCalendarAlt className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">Agendamentos</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/historys" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <FaHistory className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">Histórico</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </>
          
        )}
        
        {userRole === 'client' && (
          // Exemplo - client vai ter acesso apenas a agendamento e historico de serviços
          <Link to="/services" className="w-full">
            <Card className="h-[180px] flex flex-col justify-between p-4">
              <CardHeader className="flex flex-col items-center flex-grow">
                <Scissors className="text-gray-800 w-16 h-16" /> 
                <CardTitle className="mt-2 text-center text-lg font-semibold">Ver Serviços</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;