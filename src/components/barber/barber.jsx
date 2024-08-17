/* eslint-disable react/jsx-no-undef */
// src/components/barber/barber.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import BarberEditModal from "./barberEditModal.jsx";


const initialRows = [
  {
    id: 1,
    date: '17/08/2024',
    name: 'Paulo',
    email: 'paulo@email.com',
    telephone: '(87) 96633-8855',
    cpf: '999.888.777-66',
    salary: 'R$ 1.500,00'
  },
  {
    id: 2,
    date: '14/06/2024',
    name: 'Pedrinho',
    email: 'pedro@email.com',
    telephone: '(87) 9 8185-5858',
    cpf: '858.858.858.58',
    salary: 'R$ 1.000,00'
  },
  {
    id: 3,
    date: '26/01/2023',
    name: 'Mari',
    email: 'mari@email.com',
    telephone: '(87) 9 6666-8855',
    cpf: '333.333.333-33',
    salary: 'R$ 2.500,00'
  },
  {
    id: 4,
    date: '04/04/2014',
    name: 'Joaquim',
    email: 'joaquim@email.com',
    telephone: '(87) 9 4444-4444',
    cpf: '444.444.444-44',
    salary: 'R$ 4.000,00'
  },
  {
    id: 5,
    date: '05/05/2015',
    name: 'Barbolemeu',
    email: 'bartolomeu@email.com',
    telephone: '(87) 9 5555-5555',
    cpf: '555.555.555-55',
    salary: 'R$ 5.500,00'
  }
];

const Barber = () => {
  const [barbers, setBarbers] = useState(initialRows);
  const [newBarber, setNewBarber] = useState({
    id: '',
    date: '',
    name: '',
    email: '',
    telephone: '',
    cpf: '',
    salary: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editBarberId, setEditBarberId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBarber((prevBarber) => ({
      ...prevBarber,
      [name]: value
    }));
  };

  const handleAddBarber = () => {
    if (!newBarber.name || !newBarber.email || !newBarber.telephone || !newBarber.cpf || !newBarber.salary) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (editMode) {
      setBarbers((prevBarbers) => prevBarbers.map((barber) =>
        barber.id === editBarberId ? { ...newBarber, id: editBarberId, date: new Date().toLocaleDateString() } : barber
      ));
      setEditMode(false);
      setEditBarberId(null);
    } else {
      setBarbers((prevBarbers) => [
        ...prevBarbers,
        {
          ...newBarber,
          id: barbers.length + 1,
          date: new Date().toLocaleDateString()
        }
      ]);
    }
    setNewBarber({ id: '', date: '', name: '', email: '', telephone: '', cpf: '', salary: '' });
  };

  const handleRedirectToForm = () => {
    navigate('/barberForm');
  };

  const handleRemoveBarber = (id) => {
    setBarbers((prevBarbers) => prevBarbers.filter(barber => barber.id !== id));
  };

  const handleEditBarber = (barber) => {
    setNewBarber(barber);
    setEditBarberId(barber.id);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedBarber) => {
    setBarbers((prevBarbers) => prevBarbers.map((barber) =>
      barber.id === updatedBarber.id ? updatedBarber : barber
    ));
  };

  const tableRows = barbers.map((row) => (
    <TableRow key={row.id}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.date}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.telephone}</TableCell>
      <TableCell>{row.cpf}</TableCell>
      <TableCell>{row.salary}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <button 
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEditBarber(row)}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            className="text-red-500 hover:text-red-700"
            onClick={() => handleRemoveBarber(row.id)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4 w-full'>
      <h1 className='text-3xl font-bold'>{editMode ? 'Editar Barbeiro' : 'Barbeiros'}</h1>
      <div className='flex items-center justify-between w-full'>
        <form className='flex items-center gap-2 w-full' onSubmit={(e) => { e.preventDefault(); handleAddBarber(); }}>
          <Input name="id" placeholder='ID do barbeiro' value={newBarber.id} onChange={handleInputChange} readOnly={editMode} />
          <Input name="name" placeholder='Nome do barbeiro' value={newBarber.name} onChange={handleInputChange} />
          <Button type="submit">
            {editMode ? 'Salvar Alterações' : 'Adicionar Barbeiro'}
          </Button>
          {!editMode && (
            <Button onClick={handleRedirectToForm}>
              <PlusCircle className='w-4 h-4 mr-2' />
              Novo barbeiro
            </Button>
          )}
        </form>
      </div>
      <div className='border rounded w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data de Admissão</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Salário</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </div>
      <BarberEditModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        barber={newBarber}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Barber;