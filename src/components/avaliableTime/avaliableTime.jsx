import { useState, useEffect } from 'react';
import api from '@/api/api';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const AvailableTime = () => {
    const [availableTimes, setAvailableTimes] = useState([]);
    const [services, setServices] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [selectedBarber, setSelectedBarber] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [editableRowId, setEditableRowId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);

    useEffect(() => {
        fetchAvailableTimes();
        fetchServices();
        fetchBarbers();
    }, []);

    const fetchAvailableTimes = async () => {
        try {
            const response = await api.get('/api/available-times');
            setAvailableTimes(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            toast.error('Erro ao buscar horários disponíveis.');
            console.error('Erro ao buscar horários disponíveis:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await api.get('/api/servicos');
            setServices(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            toast.error('Erro ao buscar serviços.');
            console.error('Erro ao buscar serviços:', error);
        }
    };

    const fetchBarbers = async () => {
        try {
            const response = await api.get('/api/barber');
            setBarbers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            toast.error('Erro ao buscar barbeiros.');
            console.error('Erro ao buscar barbeiros:', error);
        }
    };

    const addThreeHours = (time) => {
        if (!time) return '';
        const date = dayjs(`1970-01-01T${time}`);
        return date.add(3, 'hour').format('HH:mm');
    };

    const formatToISODateTime = (time) => {
        if (!time) return '';
        const today = dayjs().format('YYYY-MM-DD');
        const dateTime = dayjs(`${today}T${addThreeHours(time)}`);
        return dateTime.isValid() ? dateTime.toISOString() : '';
    };

    const formatTimeDisplay = (time) => {
        return dayjs(time).format('HH:mm');
    };

    const handleAddOrUpdateAvailableTime = async () => {
        if (!selectedService || !selectedBarber || !timeStart || !timeEnd) {
            toast.error('Serviço, barbeiro, horário de início e fim são obrigatórios.');
            return;
        }

        try {
            const requestData = {
                service: Number(selectedService),
                barber: Number(selectedBarber),
                timeStart: formatToISODateTime(timeStart),
                timeEnd: formatToISODateTime(timeEnd),
                isScheduled: false
            };

            if (editableRowId) {
                await api.put(`/api/available-times/${editableRowId}`, requestData);
                toast.success('Horário atualizado com sucesso!');
                setEditableRowId(null);
            } else {
                await api.post('/api/available-times', requestData);
                toast.success('Horário adicionado com sucesso!');
            }

            fetchAvailableTimes();
            setSelectedService('');
            setSelectedBarber('');
            setTimeStart('');
            setTimeEnd('');
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Erro ao salvar horário.');
            console.error('Erro ao salvar horário:', error);
        }
    };

    const handleRemoveAvailableTimeItem = async () => {
        try {
            if (rowToDelete) {
                await api.delete(`/api/available-times/${rowToDelete.id}`);
                fetchAvailableTimes();
                toast.success('Horário removido com sucesso!');
                setIsConfirmDeleteOpen(false);
                setRowToDelete(null);
            }
        } catch (error) {
            toast.error('Erro ao remover horário.');
            console.error('Erro ao remover horário:', error);
        }
    };

    const openModalForNewAvailableTime = () => {
        setEditableRowId(null);
        setSelectedService('');
        setSelectedBarber('');
        setTimeStart('');
        setTimeEnd('');
        setIsModalOpen(true);
    };

    const openConfirmDeleteModal = (row) => {
        setRowToDelete(row);
        setIsConfirmDeleteOpen(true);
    };

    const getServiceById = (serviceId) => {
        const service = services.find(service => service.id === serviceId);
        return service ? service.name : 'Serviço não encontrado';
    };

    const getBarberById = (barberId) => {
        const barber = barbers.find(barber => barber.id === barberId);
        return barber ? barber.name : 'Barbeiro não encontrado';
    };

    const tableRows = availableTimes.map((row, index) => (
        <TableRow key={row.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
            <TableCell className="text-center px-4 py-2">{getServiceById(row.service)}</TableCell>
            <TableCell className="text-center px-4 py-2">{getBarberById(row.barber)}</TableCell>
            <TableCell className="text-center px-4 py-2">
                {`${formatTimeDisplay(row.timeStart)} - ${formatTimeDisplay(row.timeEnd)}`}
            </TableCell>
            <TableCell className="text-center px-4 py-2">
                <div className="flex justify-center space-x-4">
                    <button onClick={() => openConfirmDeleteModal(row)}>
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
            <h1 className='text-3xl font-bold'>Horários Disponíveis</h1>

            <div className="flex justify-end mb-4">
                <Button onClick={openModalForNewAvailableTime}>
                    Adicionar Horário
                </Button>
            </div>

            <div className='border rounded overflow-x-auto'>
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center px-4 py-2">Serviço</TableHead>
                            <TableHead className="text-center px-4 py-2">Barbeiro</TableHead>
                            <TableHead className="text-center px-4 py-2">Horário</TableHead>
                            <TableHead className="text-center px-4 py-2">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableRows}
                    </TableBody>
                </Table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">{editableRowId ? 'Editar Horário' : 'Adicionar Horário'}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Serviço:</label>
                                <select
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Selecione um serviço</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Barbeiro:</label>
                                <select
                                    value={selectedBarber}
                                    onChange={(e) => setSelectedBarber(e.target.value)}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Selecione um barbeiro</option>
                                    {barbers.map((barber) => (
                                        <option key={barber.id} value={barber.id}>
                                            {barber.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Início:</label>
                                <Input
                                    type="time"
                                    value={timeStart}
                                    onChange={(e) => setTimeStart(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Fim:</label>
                                <Input
                                    type="time"
                                    value={timeEnd}
                                    onChange={(e) => setTimeEnd(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <Button onClick={handleAddOrUpdateAvailableTime}>
                                    {editableRowId ? 'Atualizar' : 'Adicionar'}
                                </Button>
                                <Button onClick={() => setIsModalOpen(false)} variant="secondary">
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isConfirmDeleteOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">Confirmação de Exclusão</h2>
                        <p className="mb-4">Você tem certeza que deseja remover este horário?</p>
                        <div className="flex justify-end space-x-4">
                            <Button onClick={handleRemoveAvailableTimeItem} variant="danger">
                                Confirmar
                            </Button>
                            <Button onClick={() => setIsConfirmDeleteOpen(false)} variant="secondary">
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default AvailableTime;
