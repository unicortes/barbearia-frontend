import React from 'react';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Search, PlusCircle, Trash2, Edit } from 'lucide-react';

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
      <TableCell>
        <div className="flex space-x-2">
          <button className="text-blue-500 hover:text-blue-700">
            <Edit className="w-4 h-4" />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4'>
      <h1 className='text-3xl font-bold'>Produtos</h1>
      <div className='flex items-center justify-between'>
        <form className='flex items-center gap-2'>
          <Input name="id" placeholder='ID do produto' />
          <Input name="name" placeholder='Nome do produto' />
          <Button>
            <Search className='w-4 h-4 mr-2' />
            Filtrar Resultados
          </Button>
          
          <Dialog>
            <DialogTrigger asChild >
              <Button>
                <PlusCircle className='w-4 h-4 mr-2' />
                  Novo produto
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Produto</DialogTitle>
                <DialogDescription>Criar um novo produto</DialogDescription>
              </DialogHeader>

              <form className='space-y-6'>
                <div className='grid grid-cols-4 items-center text-right gap-3'>
                  <Label htmlFor='name'>Nome</Label>
                  <Input className='col-span-3' id='name' />
                
                </div>
                <div className='grid grid-cols-4 items-center text-right gap-3'>
                  <Label htmlFor='description'>Descrição</Label>
                  <Input className='col-span-3' id='description'/>
                
                </div>

                <div className='grid grid-cols-4 items-center text-right gap-3'>
                  <Label htmlFor='Category'>Categoria</Label>
                  <Input className='col-span-3' id='Category'/>
                
                </div>

                <div className='grid grid-cols-4 items-center text-right gap-3'>
                  <Label htmlFor='Validade'>Validade</Label>
                  <Input className='col-span-3' id='Validade'/>
                
                </div>

                <div className='grid grid-cols-4 items-center text-right gap-3'>
                  <Label htmlFor='price'>Preço</Label>
                  <Input className='col-span-3' id='price' />
                
                </div>
                <DialogFooter>
                <DialogClose asChild>
                  <Button type='button' variant='outline'>Cancelar</Button>
                </DialogClose>
                  <Button type='submit'>Salvar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        
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
            <TableHead>Ações</TableHead>
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