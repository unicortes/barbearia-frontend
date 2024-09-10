import { createBrowserRouter } from "react-router-dom";
import App from "../../App.jsx";
import Login from "../authentication/login.jsx";
import AvaliableTime from "../avaliableTime/avaliableTime.jsx";
import Barber from "../barber/barber.jsx";
import Client from "../clients/clients.jsx";
import AppointmentsAdmin from "../dailySchedule/dailyScheduleAdmin.jsx";
import AppointmentsBarber from "../dailySchedule/dailyScheduleBarber.jsx";
import AppointmentsClient from "../dailySchedule/dailyScheduleClient.jsx";
import History from "../history/history.jsx";
import HomePage from "../homePage/homePage.jsx";
import LoyaltyCard from "../loyaltyCards/loyaltyCard.jsx";
import NotFound from "../notFound/notFound.jsx";
import Products from "../products/products.jsx";
import ProductStock from "../productStock/productStock.jsx";
import Sale from "../sale/sale.jsx";
import Servicos from "../service/service.jsx";

// Define as rotas do aplicativo
const router = createBrowserRouter([
  {
    path: "/", // Rota raiz
    element: <App />, // Componente principal que renderiza o Header e o conteúdo das rotas filhas
    children: [
      {
        index: true, // Rota padrão quando o usuário acessa "/"
        element: <Login />, // Página de login
      },
      {
        path: "*", // Rota para páginas não encontradas (404)
        element: <NotFound />,
      },
      {
        path: "/authentication", // Rota para a página de login
        element: <Login />,
      },
      {
        path: "/pageHome", // Rota para a página inicial do aplicativo
        element: <HomePage />,
      },
      {
        path: "/services", // Rota para a página de serviços
        element: <Servicos />,
      },
      {
        path: "/products", // Rota para a página de produtos
        element: <Products />,
      },
      {
        path: "/productStock", // Rota para a página de controle de estoque de produtos
        element: <ProductStock />,
      },
      {
        path: "/barber", // Rota para a página de barbeiros
        element: <Barber />,
      },
      {
        path: "/clients", // Rota para a página de clientes
        element: <Client />,
      },
      {
        path: "/loyaltyCards", // Rota para a listagem de cartões de fidelidade
        element: <LoyaltyCard />,
      },
      {
        path: "/promotions", // Rota para a página de promoções
        element: <Sale />,
      },
      {
        path: "/avaliable-time", // Rota para a página de horários disponíveis
        element: <AvaliableTime />,
      },
      {
        path: "/appointment", // Rota para a página de agendamentos do cliente
        element: <AppointmentsClient />,
      },
      {
        path: "/appointments", // Rota para a página de agendamentos do barbeiro
        element: <AppointmentsBarber />,
      },
      {
        path: "/manage-appointments", // Rota para a página de gerenciamento de agendamentos
        element: <AppointmentsAdmin />,
      },
      {
        path: "/historys", // Rota para a página de histórico
        element: <History />,
      },
    ],
  },
]);

export default router;
