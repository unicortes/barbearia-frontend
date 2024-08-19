// src/components/service/service.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import ServiceEditModal from "./serviceEditModal.jsx";

const initialRows = [
  {
    id: 1,
    service: 'Corte de Cabelo',
    description: 'Corte masculino simples',
    price: 'R$ 50,00',
  },
  {
    id: 2,
    service: 'Barba',
    description: 'Aparar barba e bigode',
    price: 'R$ 30,00',
  },
  {
    id: 3,
    service: 'Corte + Barba',
    description: 'Combo de corte de cabelo e barba',
    price: 'R$ 70,00',
  },
  {
    id: 4,
    service: 'Coloração',
    description: 'Coloração de cabelo',
    price: 'R$ 100,00',
  },
];

const Service = () => {
  const [services, setServices] = useState(initialRows);
  const [newService, setNewService] = useState({
    id: '',
    service: '',
    description: '',
    price: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevService) => ({
      ...prevService,
      [name]: value
    }));
  };

  const handleAddService = () => {
    if (!newService.service || !newService.description || !newService.price) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (editMode) {
      setServices((prevServices) => prevServices.map((service) =>
        service.id === editServiceId ? { ...newService, id: editServiceId } : service
      ));
      setEditMode(false);
      setEditServiceId(null);
    } else {
      setServices((prevServices) => [
        ...prevServices,
        {
          ...newService,
          id: services.length + 1
        }
      ]);
    }
    setNewService({ id: '', service: '', description: '', price: '' });
  };

  const handleRedirectToForm = () => {
    navigate('/serviceForm');
  };

  const handleRemoveService = (id) => {
    setServices((prevServices) => prevServices.filter(service => service.id !== id));
  };

  const handleEditService = (service) => {
    setNewService(service);
    setEditServiceId(service.id);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedService) => {
    setServices((prevServices) => prevServices.map((service) =>
      service.id === updatedService.id ? updatedService : service
    ));
  };

  const tableRows = services.map((row) => (
    <TableRow key={row.id}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.service}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell>{row.price}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <button 
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEditService(row)}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            className="text-red-500 hover:text-red-700"
            onClick={() => handleRemoveService(row.id)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4 w-full'>
      <h1 className='text-3xl font-bold'>{editMode ? 'Editar Serviço' : 'Serviços'}</h1>
      <div className='flex items-center justify-between w-full'>
        <form className='flex items-center gap-2 w-full' onSubmit={(e) => { e.preventDefault(); handleAddService(); }}>
          <Input name="id" placeholder='ID do serviço' value={newService.id} onChange={handleInputChange} readOnly={editMode} />
          <Input name="service" placeholder='Nome do serviço' value={newService.service} onChange={handleInputChange} />
          <Button type="submit">
            {editMode ? 'Salvar Alterações' : 'Adicionar Serviço'}
          </Button>
          {!editMode && (
            <Button onClick={handleRedirectToForm}>
              <PlusCircle className='w-4 h-4 mr-2' />
              Novo Serviço
            </Button>
          )}
        </form>
      </div>
      <div className='border rounded w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </div>
      <ServiceEditModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        service={newService}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Service;
