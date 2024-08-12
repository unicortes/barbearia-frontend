import React from 'react';
import Header from "./components/header/header";
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <div className="flex justify-center h-screen items-center">
        <Outlet /> {/* O Outlet renderiza o conteúdo da rota atual */}
      </div>
    </>
  );
}

export default App;
