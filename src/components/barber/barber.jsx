// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Edit } from 'lucide-react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

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
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBarber((prevBarber) => ({
      ...prevBarber,
      [name]: value
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!emailRegex.test(newBarber.email)) {
      errors.email = "E-mail inválido.";
    }
    if (!phoneRegex.test(newBarber.telephone)) {
      errors.telephone = "Telefone deve estar no formato (XX) XXXXX-XXXX.";
    }
    if (!cpfRegex.test(newBarber.cpf)) {
      errors.cpf = "CPF deve estar no formato XXX.XXX.XXX-XX.";
    }
    return errors;
  };

  const handleAddBarber = () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    if (!newBarber.name || !newBarber.salary) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (editMode) {
      handleSaveEdit(newBarber);
    } else {
      const newId = barbers.length > 0 ? barbers[barbers.length - 1].id + 1 : 1;
      setBarbers((prevBarbers) => [
        ...prevBarbers,
        {
          ...newBarber,
          id: newId,
          date: new Date().toLocaleDateString()
        }
      ]);
    }

    setNewBarber({ id: '', date: '', name: '', email: '', telephone: '', cpf: '', salary: '' });
    setEditMode(false);
    setErrors({});
  };

  const handleRemoveBarber = (id) => {
    setBarbers((prevBarbers) => prevBarbers.filter(barber => barber.id !== id));
  };

  const handleEditBarber = (barber) => {
    setNewBarber(barber);
    setEditMode(true);
  };

  const handleSaveEdit = (updatedBarber) => {
    setBarbers((prevBarbers) =>
      prevBarbers.map((barber) =>
        barber.id === updatedBarber.id ? { ...updatedBarber, date: new Date().toLocaleDateString() } : barber
      )
    );
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4 w-full'>
      <h1 className='text-3xl font-bold'>{editMode ? 'Editar Barbeiro' : 'Barbeiros'}</h1>
      <div className='flex items-center justify-between w-full'>
        <form className='flex items-center gap-2 w-full' onSubmit={(e) => { e.preventDefault(); handleAddBarber(); }}>
          <Input
            name="name"
            placeholder='Nome do barbeiro'
            value={newBarber.name}
            onChange={handleInputChange}
          />
          <Input
            name="email"
            placeholder='E-mail do barbeiro'
            value={newBarber.email}
            onChange={handleInputChange}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className='text-red-500'>{errors.email}</p>}
          <Input
            name="telephone"
            placeholder='Telefone do barbeiro'
            value={newBarber.telephone}
            onChange={handleInputChange}
            className={errors.telephone ? 'border-red-500' : ''}
          />
          {errors.telephone && <p className='text-red-500'>{errors.telephone}</p>}
          <Input
            name="cpf"
            placeholder='CPF do barbeiro'
            value={newBarber.cpf}
            onChange={handleInputChange}
            className={errors.cpf ? 'border-red-500' : ''}
          />
          {errors.cpf && <p className='text-red-500'>{errors.cpf}</p>}
          <Input
            name="salary"
            placeholder='Salário do barbeiro'
            value={newBarber.salary}
            onChange={handleInputChange}
          />
          <Button type="submit">
            {editMode ? 'Salvar Alterações' : 'Adicionar Barbeiro'}
          </Button>
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
              <TableHead>Salário R$</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {barbers.map((row) => (
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Barber;
