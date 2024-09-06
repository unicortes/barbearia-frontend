import Header from "./components/header/header";
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  // Define as rotas em que o Header não deve ser exibido
  const hideHeaderRoutes = ["/", "/authentication"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {/* Renderiza o Header somente se a rota atual não estiver em hideHeaderRoutes */}
      {!shouldHideHeader && <Header />}
      <div className="flex justify-center h-screen items-center">
        <Outlet /> {/* O Outlet renderiza o conteúdo da rota atual */}
      </div>
    </>
  );
}

export default App;