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
    <div className="flex flex-wrap gap-6 p-6">
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Cadastrar Barbeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Adicione um novo barbeiro ao sistema.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/barber">
            <Button>Cadastrar</Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Cadastrar Serviço</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Adicione um novo serviço oferecido.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/services">
            <Button>Cadastrar</Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Gerenciar Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Gerencie o estoque de produtos.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/productStock">
            <Button>Gerenciar</Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Cadastrar Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Adicione um novo produto ao sistema.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/products">
            <Button>Cadastrar</Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Cadastrar Cartão de Fidelidade</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Adicione um novo cartão de fidelidade.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/loyaltyCards">
            <Button>Cadastrar</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default HomePage;
