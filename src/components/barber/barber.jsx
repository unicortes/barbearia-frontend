import api from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
// const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const Barber = () => {
  const [barbers, setBarbers] = useState([]);
  const [newBarber, setNewBarber] = useState({
    id: '',
    admissionDate: '',
    name: '',
    email: '',
    phone: '',
    cpf: '',
    salary: '',
    address: '',
    openingHours: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBarbers();
  }, []);

  const fetchBarbers = async () => {
    try {
      const response = await api.get('/barber');
      setBarbers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching barbers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBarber((prevBarber) => ({
      ...prevBarber,
      [name]: value
    }));
  };

  const validateFields = () => {
    const errors = {};
    // if (!emailRegex.test(newBarber.email)) {
    //   errors.email = "E-mail inválido.";
    // }
    //  if (newBarber.phone.length<11 || newBarber.phone.length>11 ) {
    //    errors.phone = "Telefone inválido, deve conter 11 digitos e estar no formato XXXXXXXXXXX.";
    //  }
    //  if (newBarber.cpf.length<11 || newBarber.cpf.length>11) {
    //    errors.cpf = "CPF inválido, deve ter 11 digitos  e estar no formato XXXXXXXXXXX.";
    //  }
    if (!newBarber.name || !newBarber.salary) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    return errors;
  };

  const handleAddOrEditBarber = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const barberData = { ...newBarber };

      if (editMode) {
        await api.put(`/barber/${newBarber.id}`, barberData);
        toast.success('Barbeiro atualizado com sucesso!');
      } else {
        await api.post('/barber', barberData);
        toast.success('Barbeiro adicionado com sucesso!');
      }

      fetchBarbers();
      setNewBarber({
        id: '',
        admissionDate: '',
        name: '',
        email: '',
        phone: '',
        cpf: '',
        salary: '',
        address: '',
        openingHours: ''
      });
      setEditMode(false);
      setErrors({});
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao adicionar/editar barbeiro:', error);
      toast.error('Erro ao adicionar/editar barbeiro.');
    }
  };

  const handleRemoveBarber = async (id) => {
    try {
      await api.delete(`/barber/${id}`);
      fetchBarbers();
      toast.success('Barbeiro removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover barbeiro:', error);
      toast.error('Erro ao remover barbeiro.');
    }
  };

  const openModalForNewBarber = () => {
    setNewBarber({
      id: '',
      admissionDate: '',
      name: '',
      email: '',
      phone: '',
      cpf: '',
      salary: '',
      address: '',
      openingHours: ''
    });
    setEditMode(false);
    setIsModalOpen(true);
  };

  const openModalForEditBarber = (barber) => {
    setNewBarber(barber);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className='p-6 max-w-6xl mx-auto space-y-4 w-full'>
      <Link to="/">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className='text-3xl font-bold'>Barbeiro</h1>
      <div className='flex justify-end w-full mb-4'>
      <Button onClick={openModalForNewBarber}>
          Adicionar Barbeiro
        </Button>
      </div>
      <div className='border rounded w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Data de Admissão</TableHead>
              <TableHead>Salário</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Horário de Atendimento</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(barbers) && barbers.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.cpf}</TableCell>
                <TableCell>{formatDate(row.admissionDate)}</TableCell>
                <TableCell>R$ {parseFloat(row.salary).toFixed(2)}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.openingHours}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openModalForEditBarber(row)}
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
      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{editMode ? 'Editar Barbeiro' : 'Adicionar Barbeiro'}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do barbeiro</label>
                <Input
                  name="name"
                  placeholder='Nome do barbeiro'
                  value={newBarber.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p className='text-red-500'>{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail do barbeiro</label>
                <Input
                  name="email"
                  placeholder='E-mail do barbeiro'
                  value={newBarber.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className='text-red-500'>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                <Input
                  name="phone"
                  placeholder='Telefone do barbeiro'
                  value={newBarber.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
                <Input
                  name="cpf"
                  placeholder='CPF do barbeiro'
                  value={newBarber.cpf}
                  onChange={handleInputChange}
                  className={errors.cpf ? 'border-red-500' : ''}
                />
                {errors.cpf && <p className='text-red-500'>{errors.cpf}</p>}
              </div>
              <div>
                <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-700">Data de Admissão</label>
                <Input
                  type="date"
                  name="admissionDate"
                  placeholder='Data de admissão do barbeiro'
                  value={newBarber.admissionDate}
                  onChange={handleInputChange}
                />
                {errors.admissionDate && <p className='text-red-500'>{errors.admissionDate}</p>}
              </div>
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salario</label>
                <Input
                  name="salary"
                  placeholder='Salário do barbeiro'
                  value={newBarber.salary}
                  onChange={handleInputChange}
                  className={errors.salary ? 'border-red-500' : ''}
                />
                {errors.salary && <p className='text-red-500'>{errors.salary}</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço</label>
                <Input
                  name="address"
                  placeholder='Endereço do barbeiro'
                  value={newBarber.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700">Horário de Atendimento</label>
                <Input
                  name="openingHours"
                  placeholder='Horário de atendimento do barbeiro'
                  value={newBarber.openingHours}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddOrEditBarber}>
                  {editMode ? 'Salvar Alterações' : 'Adicionar Barbeiro'}
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

export default Barber;