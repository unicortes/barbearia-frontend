import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BsBasket as BsProductStock,
  BsCalendar3Week as BsAppointments,
  BsCardChecklist as BsLoyaltyCards,
  BsPeople as BsBarber,
  BsPerson as BsClient,
  BsClock as BsAvaliableTime,
  BsScissors as BsService,
  BsTag as BsSales,
  BsClipboardData as BsHistorys,
  BsCart as BsProduct
} from "react-icons/bs";
import { Link } from "react-router-dom";

const CardItem = ({ to, icon: Icon, title }) => (
  <Link to={to} className="w-full">
    <Card className="h-[180px] flex flex-col justify-between p-4">
      <CardHeader className="flex flex-col items-center flex-grow">
        <Icon className="text-gray-800 w-16 h-16" />
        <CardTitle className="mt-2 text-center text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
    </Card>
  </Link>
);

CardItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired, // Adicionada a validação de title
};

const HomePage = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <div className="flex flex-col items-center p-6">
      <div className="grid grid-cols-3 gap-6 w-full max-w-6xl">
        {userRole === "ADMIN" && (
          <>
            <CardItem to="/barber" icon={BsBarber} title="Barbeiros" />
            <CardItem to="/clients" icon={BsClient} title="Clientes" />
            <CardItem to="/manage-appointments" icon={BsAppointments} title="Agendamentos" />
            <CardItem to="/services" icon={BsService} title="Serviços" />
            <CardItem to="/productStock" icon={BsProductStock} title="Estoque" />
            <CardItem to="/products" icon={BsProduct} title="Produtos" />
            <CardItem to="/loyaltyCards" icon={BsLoyaltyCards} title="Cartões de Fidelidade" />
            <CardItem to="/sales" icon={BsSales} title="Promoções" />
            <CardItem to="/historys" icon={BsHistorys} title="Histórico de Agendamentos" />
          </>
        )}

        {userRole === "BARBER" && (
          <>
            <CardItem to="/appointments" icon={BsAppointments} title="Agendamentos" />
            <CardItem to="/historys" icon={BsHistorys} title="Histórico de Agendamentos" />
            <CardItem to="/productStock" icon={BsProductStock} title="Estoque" />
            <CardItem to="/services" icon={BsService} title="Serviços" />
            <CardItem to="/avaliable-time" icon={BsAvaliableTime} title="Horários de Atendimento" />
          </>
        )}

        {userRole === "CLIENT" && (
          <>
            <CardItem to="/appointment" icon={BsAppointments} title="Agendar Serviços" />
            <CardItem to="/historys" icon={BsHistorys} title="Histórico de Agendamentos"/>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;