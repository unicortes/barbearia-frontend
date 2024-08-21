import React, { useState, useEffect } from 'react';
import api from '@/api/api'; 
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { Edit, Trash2 } from 'lucide-react';

const Client = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    id: '',
    name: '',
    email: '',
    birthday: '',
    phone: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients'); 
      setClients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!newClient.name) {
      errors.name = "Nome é obrigatório.";
    }
    if (!newClient.email) {
      errors.email = "E-mail é obrigatório.";
    }
    if (!newClient.birthday) {
      errors.birthday = "Data de aniversário é obrigatória.";
    }
    if (!newClient.phone) {
      errors.phone = "Telefone é obrigatório.";
    }
    return errors;
  };

  const handleAddOrEditClient = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const clientData = { ...newClient };

      if (editMode) {
        await api.put(`/clients/${newClient.id}`, clientData);
      } else {
        await api.post('/clients', clientData);
      }

      fetchClients();
      setNewClient({ id: '', name: '', email: '', birthday: '', phone: '' });
      setEditMode(false);
      setErrors({});
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding/editing client:', error);
    }
  };

  const handleRemoveClient = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error('Erro ao remover cliente:', error);
    }
  };

  const openModalForNewClient = () => {
    setNewClient({ id: '', name: '', email: '', birthday: '', phone: '' });
    setEditMode(false);
    setIsModalOpen(true);
  };

  const openModalForEditClient = (client) => {
    setNewClient(client);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4 w-full'>
      <Link to="/">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className='text-3xl font-bold'>Clientes</h1>
      <div className='flex justify-end w-full mb-4'>
        <Button onClick={openModalForNewClient}>
          Adicionar cliente
        </Button>
      </div>
      <div className='border rounded w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Data de Aniversário</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(clients) && clients.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{formatDate(row.birthday)}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openModalForEditClient(row)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveClient(row.id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{editMode ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                <Input
                  name="name"
                  placeholder='Nome do cliente'
                  value={newClient.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className='text-red-500'>{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  name="email"
                  placeholder='E-mail'
                  value={newClient.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className='text-red-500'>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                <Input
                  type="date"
                  name="birthday"
                  placeholder='Data'
                  value={newClient.birthday}
                  onChange={handleInputChange}
                  className={errors.birthday ? 'border-red-500' : ''}
                />
                {errors.birthday && <p className='text-red-500'>{errors.birthday}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                <Input
                  name="phone"
                  placeholder='Telefone'
                  value={newClient.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddOrEditClient}>
                {editMode ? 'Salvar' : 'Adicionar'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Client;