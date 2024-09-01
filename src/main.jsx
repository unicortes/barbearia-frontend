import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Login from './components/authentication/login.jsx';
import AvaliableTime from './components/avaliableTime/avaliableTime.jsx';
import Barber from './components/barber/barber.jsx';
import Client from './components/clients/clients.jsx';
import AppointmentsAdmin from './components/dailySchedule/dailyScheduleAdmin.jsx';
import AppointmentsBarber from './components/dailySchedule/dailyScheduleBarber.jsx';
import AppointmentsClient from './components/dailySchedule/dailyScheduleClient.jsx';
import History from './components/history/history.jsx';
import HomePage from './components/homePage/homePage.jsx';
import LoyaltyCard from './components/loyaltyCards/loyaltyCard.jsx';
import Products from './components/products/products.jsx';
import ProductStock from './components/productStock/productStock.jsx';
import Sale from './components/sale/sale.jsx';
import Servicos from './components/service/service.jsx';
import './global.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // O App renderiza o Header e o conteúdo principal
    children: [
      {
        index: true, // Torna essa a rota padrão quando o usuário acessa "/"
        element: <HomePage /> // Rota para a HomePage
      },
      {
        path: "/authentication",
        element: <Login /> // Rota para o Login
      },
      {
        path: "/pageHome",
        element: <HomePage /> // Rota para a HomePage
      },
      {
        path: "/services",
        element: <Servicos /> // Rota para a página Serviços
      },
      {
        path: "/products",
        element: <Products /> // Rota para a página Products
      },
      {
        path: "/productStock",
        element: <ProductStock /> // Rota para a página ProductStock
      },
      {
        path: "/barber",
        element: <Barber /> // Rota para a página Barber
      },
      {
        path: "/clients",
        element: <Client /> // Rota para a página Clients
      },
      {
        path: "/loyaltyCards",
        element: <LoyaltyCard /> // Rota para a listagem de Cartões de Fidelidade
      },
      {
        path: "/sales",
        element: <Sale /> // Rota para a listagem Promoções
      },
      {
        path: "/avaliable-time",
        element: <AvaliableTime /> // Rota para a listagem Horários
      },
      {
        path: "/appointment",
        element: <AppointmentsClient /> // Rota para a listagem Agendamentos
      },
      {
        path: "/appointments",
        element: <AppointmentsBarber /> // Rota para a listagem Agendamentos
      },
      {
        path: "/manege-appointments",
        element: <AppointmentsAdmin /> // Rota para a listagem Agendamentos
      },
      {
        path: "/historys",
        element: <History/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
