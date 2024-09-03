import api from '@/api/api';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Scissors } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await api.post("/login", {
        email,
        password
      });
      
      const { token, role } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);

      if (["ADMIN", "BARBER", "CLIENT"].includes(role)) {
        navigate("/pageHome");
      } else {
        setError("Login inválido.");
      }
    } catch (err) {
      console.error("Erro de login:", err);
      setError("E-mail ou senha inválidos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-4xl p-10 shadow-lg rounded-lg flex flex-col justify-center items-center bg-gray-800">
        <Scissors className="text-white w-20 h-20" />
        <h1 className="mt-4 text-center text-3xl font-semibold text-white">
          UniCortes
        </h1>

        <form onSubmit={handleLogin} className="mt-6 space-y-6 w-full">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded bg-transparent text-white placeholder-gray-400"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded bg-transparent text-white placeholder-gray-400"
          />
          <Button
            type="submit"
            className="w-full p-4 mt-4 text-white bg-gradient-to-r from-gray-800 to-gray-600"
          >
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
