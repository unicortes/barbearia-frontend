import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './components/homePage/homePage.jsx';
import Servicos from './components/servicos/servicos.jsx';
import Products from './components/products/products.jsx';
import ProductStock from './components/productStock/productStock.jsx';
import Barber from './components/barber/barber.jsx';
import BarberForm from './components/barber/barberForm.jsx'; // Corrigido para o nome correto do componente
import LoyaltyCardForm from './components/loyaltyCard/LoyaltyCardForm.jsx'; // Importar o componente de formulário de cartão de fidelidade
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
        path: "/pageHome",
        element: <HomePage /> // Rota para a HomePage
      },
      {
        path: "/servicos",
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
        path: "/barberForm",
        element: <BarberForm /> // Rota para o formulário de Barber
      },
      {
        path: "/loyaltyCardForm",
        element: <LoyaltyCardForm /> // Rota para o formulário de Cartão de Fidelidade
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
