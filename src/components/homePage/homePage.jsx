import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BsPerson as BsBarber,
  BsBox,
  BsCalendar,
  BsCardChecklist,
  BsCart,
  BsPerson as BsClient,
  BsClock,
  BsScissors,
  BsTag,
} from "react-icons/bs";
import { FaCalendarAlt, FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <div className="flex flex-col items-center p-6">
      <div className="grid grid-cols-3 gap-6 w-full max-w-6xl">
        {userRole === "ADMIN" && (
          <>
            <Link to="/barber" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <BsBarber className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">
                    Gerenciar Barbeiros
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/clients" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <BsClient className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">
                    Gerenciar Cliente
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/avaliable-time" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <BsClock className="text-gray-800 w-16 h-16" />{" "}
                  <CardTitle className="mt-2 text-center text-lg font-semibold">
                    Gerenciar Horários
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/manage-appointments" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <BsCalendar className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">
                    Gerenciar Agendamentos
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/services" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <BsScissors className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">
                    Gerenciar Serviços
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/productStock" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <BsBox className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">
                    Gerenciar Estoque
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/products" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <BsCart className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">
                    Gerenciar Produtos
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/loyaltyCards" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <BsCardChecklist className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">
                    Gerenciar Cartões de Fidelidade
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/sales" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <BsTag className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">
                    Gerenciar Promoções
                  </CardTitle>
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

        {userRole === "BARBER" && (
          <>
            <div className="flex justify-center w-full">
              <Link to="/appointments" className="w-full max-w-sm">
                <Card className="h-[180px] flex flex-col justify-between p-4">
                  <CardHeader className="flex flex-col items-center flex-grow">
                    <FaCalendarAlt className="text-gray-800 w-16 h-16" />
                    <CardTitle className="mt-2 text-center text-lg font-semibold">
                      Gerenciar Agendamentos
                    </CardTitle>
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
            </div>
          </>
        )}

        {userRole === "CLIENT" && (
          <>
            <Link to="/appointment" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <BsCalendar className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">
                    Agendar Serviços
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
            {/* 
            <Link to="/*" className="w-full">
              <Card className="h-[180px] flex flex-col justify-between p-4">
                <CardHeader className="flex flex-col items-center flex-grow">
                  <BsCalendar className="text-gray-800 w-16 h-16" />
                  <CardTitle className="mt-2 text-center text-lg font-semibold">
                    Meus Agendamentos
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link> */}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
