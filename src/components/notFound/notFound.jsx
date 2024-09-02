import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">Página não encontrada</p>
      <Link to="/pageHome" className="text-blue-500 hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;
