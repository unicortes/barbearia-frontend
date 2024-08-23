import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './components/homePage/homePage.jsx';
import Servicos from './components/service/service.jsx'; 
import Products from './components/products/products.jsx';
import ProductStock from './components/productStock/productStock.jsx';
import Barber from './components/barber/barber.jsx';
import LoyaltyCard from './components/loyaltyCards/loyaltyCard.jsx'; 
import Client from './components/clients/clients.jsx';
import './global.css';
import Sale from './components/sale/sale.jsx';

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
        path: "/sale",
        element: <Sale /> // Rota para a listagem Promoções
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
