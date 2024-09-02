import { useState, useEffect } from 'react';
import api from '@/api/api'; 
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { Edit, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/servicos'); 
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Erro ao buscar serviços.');
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

  const handleAddOrEditService = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const serviceData = { ...newService };

      if (editMode) {
        await api.put(`/api/servicos/${newService.id}`, serviceData);
        toast.success('Serviço atualizado com sucesso!');
      } else {
        await api.post('/api/servicos', serviceData);
        toast.success('Serviço adicionado com sucesso!');
      }

      fetchServices();
      setNewService({ id: '', name: '', description: '', price: '' });
      setEditMode(false);
      setErrors({});
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding/editing serviço:', error);
      toast.error('Erro ao adicionar/editar serviço.');
    }
  };

  const handleRemoveService = async (id) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este serviço?');
    if (confirm) {
      try {
        await api.delete(`/api/servicos/${id}`);
        fetchServices();
        toast.success('Serviço removido com sucesso!');
      } catch (error) {
        console.error('Erro ao remover serviço:', error);
        toast.error('Erro ao remover serviço.');
      }
    }
  };

  const openModalForNewService = () => {
    setNewService({ id: '', name: '', description: '', price: '' });
    setEditMode(false);
    setIsModalOpen(true);
  };

  const openModalForEditService = (service) => {
    setNewService(service);
    setEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4 w-full'>
      <Link to="/pageHome">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className='text-3xl font-bold'>Serviços</h1>
      <div className='flex justify-end w-full mb-4'>
        <Button onClick={openModalForNewService}>
          Adicionar Serviço
        </Button>
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
            {Array.isArray(services) && services.map((row, index) => (
              <TableRow key={row.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>R$ {parseFloat(row.price).toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openModalForEditService(row)}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{editMode ? 'Editar Serviço' : 'Adicionar Serviço'}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                <Input
                  name="name"
                  placeholder='Nome do serviço'
                  value={newService.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className='text-red-500'>{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                <Input
                  name="description"
                  placeholder='Descrição'
                  value={newService.description}
                  onChange={handleInputChange}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className='text-red-500'>{errors.description}</p>}
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
                <Input
                  name="price"
                  placeholder='Preço'
                  value={newService.price}
                  onChange={handleInputChange}
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && <p className='text-red-500'>{errors.price}</p>}
              </div>
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddOrEditService}>
                  {editMode ? 'Salvar Alterações' : 'Adicionar Serviço'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Service;
