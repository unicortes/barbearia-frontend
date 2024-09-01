import api from '@/api/api';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const History = () => {
 
  const [historys, setHistorys] = useState([]);
  const [token, setToken] = useState(null);
  const [role, setRole]=useState(null);
  const [idUser, setIdUser]=useState(null);

  const fetchHistorysAdmin = async () => {
    try {
      const response = await api.get('/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }); 
      setHistorys(response.data);
    } catch (error) {
      toast.error('Erro ao recuperar estorico');
    }
  };

  const fetchHistorys = async () => {
    try {
      const response = await api.get(`/api/appointments/barber/${idUser}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }); 
      setHistorys(response.data);
    } catch (error) {
      toast.error('Erro ao recuperar estorico');
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken'); 
    const storedRole = localStorage.getItem('userRole');
    const storedId = localStorage.getItem('userId');  

    setToken(storedToken);
    setRole(storedRole);
    setIdUser(storedId);
  }, []);

  useEffect(() => {
    if (token) {
      console.log(role)
      if(role=='ADMIN'){
        fetchHistorysAdmin();
      }else if(role=='BARBER'){
        fetchHistorys();
      }
      
    }
  }, [token]); 

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4 w-full">
      <Link to="/">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className="text-3xl font-bold">Histórico</h1>
      
      <div className="border rounded w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Barbeiro</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data e Hora</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historys.map((item) => (
              <TableRow key={item.id}>
                <td>{item.id}</td>
                <td>{item.service.name}</td>
                <td>{item.barber.name}</td>
                <td>{item.clientName}</td>
                <td>{new Date(item.appointmentDateTime).toLocaleString()}</td>
                <td>{item.status}</td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default History;
