import React, { useState, useEffect } from 'react';
import api from '@/api/api';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from 'lucide-react';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoyaltyCard = () => {
  const [cards, setCards] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    dateAdmission: '',
    clientId: '',
    serviceId: '',
    points: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchLoyaltyCards();
    fetchClients();
    fetchServices();
  }, []);

  const fetchLoyaltyCards = async () => {
    try {
      const response = await api.get('/api/loyalty-cards');
      setCards(response.data);
    } catch (error) {
      console.error("Erro ao buscar cartões de fidelidade:", error);
      toast.error('Erro ao buscar cartões de fidelidade.');
    }
  };

  const fetchClients = async () => {
    try {
      const response = await api.get('/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      toast.error('Erro ao buscar clientes.');
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/servicos');
      setServices(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      toast.error('Erro ao buscar serviços.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'points') {
      return;
    } else if (name === 'clientId' || name === 'serviceId') {
      setSelectedCard((prevCard) => ({
        ...prevCard,
        [name]: Number(value)
      }));
    } else if (name === 'dateAdmission') {
      setSelectedCard((prevCard) => ({
        ...prevCard,
        [name]: value
      }));
    } else {
      setSelectedCard((prevCard) => ({
        ...prevCard,
        [name]: value
      }));
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!selectedCard.dateAdmission) errors.dateAdmission = "Data de admissão é obrigatória.";
    if (!selectedCard.clientId) errors.clientId = "Cliente é obrigatório.";
    if (!selectedCard.serviceId) errors.serviceId = "Serviço é obrigatório.";
    return errors;
  };

  const handleAddOrUpdateCard = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    const formattedDateAdmission = new Date(selectedCard.dateAdmission).toISOString().split('T')[0];

    const payload = {
      dateAdmission: formattedDateAdmission,
      clientId: selectedCard.clientId,
      serviceId: selectedCard.serviceId,
      points: 0 
    };

    try {
      if (selectedCard.id) {
        await api.put(`/api/loyalty-cards/${selectedCard.id}`, payload);
        toast.success('Cartão de fidelidade atualizado com sucesso!');
      } else {
        await api.post('/api/loyalty-cards', payload);
        toast.success('Cartão de fidelidade adicionado com sucesso!');
      }

      fetchLoyaltyCards();
      setSelectedCard({ dateAdmission: '', clientId: '', serviceId: '', points: 0 });
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error("Erro ao salvar cartão de fidelidade:", error);
      toast.error('Erro ao salvar cartão de fidelidade.');
    }
  };

  const handleRemoveCard = async (id) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este cartão?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/loyalty-cards/${id}`);
      fetchLoyaltyCards();
      toast.success('Cartão de fidelidade removido com sucesso!');
    } catch (error) {
      console.error("Erro ao remover cartão de fidelidade:", error);
      toast.error('Erro ao remover cartão de fidelidade.');
    }
  };

  const handleAddPoint = async (card) => {
    try {
      const updatedCard = { ...card, points: card.points + 1 };
      await api.put(`/api/loyalty-cards/${card.id}`, updatedCard);
      fetchLoyaltyCards();
      toast.success('Ponto adicionado com sucesso!');
    } catch (error) {
      console.error("Erro ao adicionar ponto:", error);
      toast.error('Erro ao adicionar ponto.');
    }
  };

  const openModalForNewCard = () => {
    setSelectedCard({ dateAdmission: '', clientId: '', serviceId: '', points: 0 });
    setIsModalOpen(true);
  };

  const getClientNameById = (clientId) => {
    const client = clients.find(client => client.id === clientId);
    return client ? client.name : 'Cliente não encontrado';
  };

  const getServiceNameById = (serviceId) => {
    const service = services.find(service => service.id === serviceId);
    return service ? service.name : 'Serviço não encontrado';
  };

  const tableRows = cards.map((card, index) => (
    <TableRow key={card.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
      <TableCell className="text-center px-4 py-2">{getClientNameById(card.clientId)}</TableCell>
      <TableCell className="text-center px-4 py-2">{getServiceNameById(card.serviceId)}</TableCell>
      <TableCell className="text-center px-4 py-2">{card.points}</TableCell>
      <TableCell className="text-center px-4 py-2">
        <div className="flex justify-center space-x-4">
          <button onClick={() => handleAddPoint(card)}>
            <Plus className="w-4 h-4 text-green-500 hover:text-green-700" />
          </button>
          <button onClick={() => handleRemoveCard(card.id)}>
            <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className='p-6 max-w-6xl mx-auto space-y-4'>
      <Link to="/pageHome">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className='text-3xl font-bold'>Cartões de Fidelidade</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={openModalForNewCard}>
          Adicionar Cartão
        </Button>
      </div>

      <div className='border rounded overflow-x-auto'>
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-4 py-2">Cliente</TableHead>
              <TableHead className="text-center px-4 py-2">Serviço</TableHead>
              <TableHead className="text-center px-4 py-2">Pontos</TableHead>
              <TableHead className="text-center px-4 py-2">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{selectedCard.id ? 'Editar Cartão' : 'Adicionar Cartão'}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="dateAdmission" className="block text-sm font-medium text-gray-700">Data de Admissão</label>
                <Input
                  type="date"
                  name="dateAdmission"
                  value={selectedCard.dateAdmission}
                  onChange={handleInputChange}
                />
                {errors.dateAdmission && <p className="text-red-500 text-xs mt-1">{errors.dateAdmission}</p>}
              </div>
              <div>
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Cliente</label>
                <select
                  name="clientId"
                  value={selectedCard.clientId}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Selecione um cliente</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                {errors.clientId && <p className="text-red-500 text-xs mt-1">{errors.clientId}</p>}
              </div>
              <div>
                <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700">Serviço</label>
                <select
                  name="serviceId"
                  value={selectedCard.serviceId}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Selecione um serviço</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
                {errors.serviceId && <p className="text-red-500 text-xs mt-1">{errors.serviceId}</p>}
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={handleAddOrUpdateCard}>
                  {selectedCard.id ? 'Atualizar' : 'Adicionar'}
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

export default LoyaltyCard;
