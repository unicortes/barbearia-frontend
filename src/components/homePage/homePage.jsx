import * as React from "react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="flex gap-6">
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Cadastrar Barbeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4"></div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/barber">
            <Button asChild>
              <a>Cadastrar</a>
            </Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Cadastrar Serviço</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4"></div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/servicos">
            <Button asChild>
              <a>Cadastrar</a>
            </Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Gerenciar Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4"></div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/productStock">
            <Button asChild>
              <a>Gerenciar</a>
            </Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Cadastrar Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4"></div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/products">
            <Button asChild>
              <a>Cadastrar</a>
            </Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Cadastrar Cartão de Fidelidade</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4"></div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/loyaltyCardForm">
            <Button asChild>
              <a>Cadastrar</a>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default HomePage;
