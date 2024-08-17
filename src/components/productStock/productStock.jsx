import React from 'react';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const stockRows = [
  { id: 123, name: 'arroz', quantity: 50 },
  { id: 124, name: 'feijão', quantity: 30 },
  { id: 125, name: 'macarrão', quantity: 20 },
  { id: 126, name: 'farinha', quantity: 40 },
  { id: 127, name: 'açúcar', quantity: 25 },
];

const ProductStock = () => {
  const tableRows = stockRows.map((row) => (
    <TableRow key={row.id}>
      <TableCell className="text-center px-4 py-2">{row.id}</TableCell>
      <TableCell className="text-center px-4 py-2">{row.name}</TableCell>
      <TableCell className="text-center px-4 py-2">{row.quantity}</TableCell>
      <TableCell className="text-center px-4 py-2">
        <div className="flex justify-center space-x-4">
          <button className="text-green-500 hover:text-green-700">
            <PlusCircle className="w-5 h-5" />
          </button>
          <button className="text-blue-500 hover:text-blue-700">
            <Edit className="w-5 h-5" />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className='p-6 max-w-6xl mx-auto space-y-4'>
      <h1 className='text-3xl font-bold'>Estoque</h1>
      <div className='border rounded overflow-x-auto'>
        <Table className="min-w-full">
          <TableHeader>
            <TableHead className="text-center px-4 py-2">ID</TableHead>
            <TableHead className="text-center px-4 py-2">Nome</TableHead>
            <TableHead className="text-center px-4 py-2">Quantidade</TableHead>
            <TableHead className="text-center px-4 py-2">Ações</TableHead>
          </TableHeader>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default ProductStock;