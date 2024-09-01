import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import api from "@/api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simulando diferentes tipos de login com dados mockados
    let mockResponse;

    if (email === "admin@unicortes.com" && password === "admin123") {
      mockResponse = {
        token: "mock-admin-token",
        role: "ADMIN",
      };
    } else if (email === "barber@unicortes.com" && password === "barber123") {
      mockResponse = {
        token: "mock-barber-token",
        role: "BARBER",
      };
    } else if (email === "client@unicortes.com" && password === "client123") {
      mockResponse = {
        token: "mock-client-token",
        role: "CLIENT",
      };
    } else {
      alert("E-mail ou senha inválidos");
      return;
    }

    localStorage.setItem("authToken", mockResponse.token);
    localStorage.setItem("userRole", mockResponse.role);

    // Redirecionar o usuário com base na role
    if (mockResponse.role === "ADMIN") {
      navigate("/pageHome");
    } else if (mockResponse.role === "BARBER") {
      navigate("/pageHome");
    } else if (mockResponse.role === "CLIENT") {
      navigate("/pageHome");
    }
  };

  //   try {
  //     const response = await api.post("/login", {
  //       email,
  //       password,
  //     });

  //     const { token, role } = response.data;

  //     localStorage.setItem("authToken", token);
  //     localStorage.setItem("userRole", role);

  //     if (role === "ADMIN" || role === "BARBER" || role === "CLIENT") {
  //       navigate("/pageHome");
  //     } else {
  //       setError("Login inválido.");
  //     }
  //   } catch (err) {
  //     console.error("Erro de login:", err);
  //     setError("E-mail ou senha inválidos");
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card
        className="w-full max-w-4xl p-10 shadow-lg rounded-lg flex flex-col justify-center items-center"
        style={{
          backgroundColor: "rgb(31, 41, 55)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
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
            className="w-full p-4 border border-gray-300 rounded text-white bg-transparent"
            style={{ color: "white" }}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded text-white bg-transparent"
            style={{ color: "white" }}
          />
          <Button
            type="submit"
            className="w-full p-4 mt-4 text-white bg-gradient-to-r from-[#1f2937] to-[#4b5563]"
          >
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
