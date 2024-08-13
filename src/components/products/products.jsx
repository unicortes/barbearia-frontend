import React from 'react';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from 'lucide-react';

const rows = [
  {
    id: 123,
    name: 'arroz',
    description: 'produto arroz',
    category: 'alimento',
    date: '12/12/12',
    price: 'R$ 100,00'
  },
  {
    id: 124,
    name: 'feijão',
    description: 'produto feijão',
    category: 'alimento',
    date: '13/12/12',
    price: 'R$ 80,00'
  },
  {
    id: 125,
    name: 'macarrão',
    description: 'produto macarrão',
    category: 'alimento',
    date: '14/12/12',
    price: 'R$ 70,00'
  },
  {
    id: 126,
    name: 'farinha',
    description: 'produto farinha',
    category: 'alimento',
    date: '15/12/12',
    price: 'R$ 50,00'
  },
  {
    id: 127,
    name: 'açúcar',
    description: 'produto açúcar',
    category: 'alimento',
    date: '16/12/12',
    price: 'R$ 60,00'
  }
];

const Product = () => {
  const tableRows = rows.map((row) => (
    <TableRow key={row.id}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell>{row.category}</TableCell>
      <TableCell>{row.date}</TableCell>
      <TableCell>{row.price}</TableCell>
    </TableRow>
  ));

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4'>
      <h1 className='text-3xl font-bold'>Produtos</h1>
      <div className='flex items-center justify-between'>
        <form className='flex items-center gap-2'>
          <Input name="id" placeholder='ID do pedido' />
          <Input name="name" placeholder='Nome do produto' />
          <Button>
            <Search className='w-4 h-4 mr-2'>
              
            </Search>
            Filtrar Resultados
          </Button>

          
        

          <Button>
          <PlusCircle className='w-4 h-4 mr-2' />
          Novo produto
          </Button>
          </form>
      </div>
      <div className='border rounded'>
        <Table>
          <TableHeader>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Validade</TableHead>
            <TableHead>Preço</TableHead>
          </TableHeader>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Product;