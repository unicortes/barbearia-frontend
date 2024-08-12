import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import HomePage from './components/homePage/homePage.jsx'
import Servicos from './components/servicos/servicos.jsx'
import Products from './components/products/products.jsx'
import ProductStock from './components/productStock/productStock.jsx'
import Barber from './components/barber/barber.jsx'
import React from 'react';
import './global.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // O App renderiza o Header e o conteúdo principal
    children: [
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
        element: <Products /> // Rota para a HomePage
      },
      {
        path: "/productStock",
        element: <ProductStock /> // Rota para a HomePage
      }
      ,
      {
        path: "/barber",
        element: <Barber /> // Rota para a HomePage
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
