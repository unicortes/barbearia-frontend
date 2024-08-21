import api from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

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
    address: "123 Main St, Apt 4, Springfield",
    openingHours: "08:00-17:00"
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (!emailRegex.test(newBarber.email)) {
      errors.email = "E-mail inválido.";
    }
    //  if (newBarber.phone.length<11 || newBarber.phone.length>11 ) {
    //    errors.phone = "Telefone inválido, deve conter 11 digitos e estar no formato XXXXXXXXXXX.";
    //  }
    //  if (newBarber.cpf.length<11 || newBarber.cpf.length>11) {
    //    errors.cpf = "CPF inválido, deve ter 11 digitos  e estar no formato XXXXXXXXXXX.";
    //  }
    return errors;
  };

  const handleAddBarber = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    if (!newBarber.name || !newBarber.salary) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      if (editMode) {
        await api.put(`/barber/${newBarber.id}`, newBarber);
        fetchBarbers();
      } else {
        const barberDate={...newBarber}
        await api.post('/barber',barberDate)
        fetchBarbers();
      }
    } catch (error) {
      console.error('Erro ao adicionar/editar barbeiro:', error);
    }

    setNewBarber({ id: '', admissionDate: '', name: '', email: '', phone: '', cpf: '', salary: '' });
    setEditMode(false);
    setErrors({});
  };

  const handleRemoveBarber = async (id) => {
    try {
      await api.delete(`/barber/${id}`);
      fetchBarbers();
    } catch (error) {
      console.error('Erro ao remover barbeiro:', error);
    }
  };

  const handleEditBarber = (barber) => {
    setNewBarber(barber);
    setEditMode(true);
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4 w-full'>
      <Link to="/">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
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
            name="phone"
            placeholder='Telefone do barbeiro'
            value={newBarber.phone}
            onChange={handleInputChange}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
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
            {Array.isArray(barbers) && barbers.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.admissionDate}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
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