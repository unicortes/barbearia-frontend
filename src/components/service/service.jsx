import React, { useState, useEffect } from 'react';
import api from '@/api/api'; 
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2 } from 'lucide-react';

const Service = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    id: '',
    name: '',
    description: '',
    price: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/servicos'); 
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching servicos:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevService) => ({
      ...prevService,
      [name]: value
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!newService.name) {
      errors.name = "Nome é obrigatório.";
    }
    if (!newService.description) {
      errors.description = "Descrição é obrigatória.";
    }
    if (!newService.price || isNaN(newService.price)) {
      errors.price = "Preço é obrigatório e deve ser um número válido.";
    }
    return errors;
  };

  const handleAddService = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const serviceData = { ...newService };

      if (editMode) { // Avalia se está no modo de edição
        await api.put(`/servicos/${newService.id}`, serviceData); // Edita o produto
      } else {
        await api.post('/servicos', serviceData); // Cadastra um novo produto
      }

      fetchServices(); // Atualiza a lista de produtos
      setNewService({ id: '', name: '', description: '', category: '', expirationDate: '', cost: '', type: '' }); 
      setEditMode(false); // Sai do modo de edição
      setErrors({}); 
    } catch (error) {
      console.error('Error adding/editing serviço:', error);
    }
  };

  const handleRemoveService = async (id) => {
    try {
      await api.delete(`/servicos/${id}`); 
      fetchServices(); 
    } catch (error) {
      console.error('Erro ao remover serviço:', error);
    }
  };

  const handleEditService = (service) => {
    setNewService(service);
    setIsEditing(true);
  };

  const handleDeleteService = (id) => {
    setServices((prevServices) => prevServices.filter(service => service.id !== id));
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4 w-full'>
      <h1 className='text-3xl font-bold'>{editMode ? 'Editar serviço' : 'Serviços'}</h1>
      <div className='flex items-center justify-between w-full'>
        <form className='flex items-center gap-2 w-full' onSubmit={(e) => { e.preventDefault(); handleAddService(); }}>
          <Input
            name="name"
            placeholder='Nome do serviço'
            value={newService.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className='text-red-500'>{errors.name}</p>}
          <Input
            name="description"
            placeholder='Descrição'
            value={newService.description}
            onChange={handleInputChange}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && <p className='text-red-500'>{errors.description}</p>}
          <Input
            name="price"
            placeholder='Preço'
            value={newService.price}
            onChange={handleInputChange}
            className={errors.price ? 'border-red-500' : ''}
          />
          {errors.price && <p className='text-red-500'>{errors.price}</p>}
          <Button type="submit">
            {editMode ? 'Salvar Alterações' : 'Adicionar serviço'}
          </Button>
        </form>
      </div>
      <div className='border rounded w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(services) && services.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>R$ {row.price.toFixed(2)}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Service;
