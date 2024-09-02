import { useState, useEffect } from 'react';
import api from '@/api/api';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AvailableTime = () => {
    const [availableTimes, setAvailableTimes] = useState([]);
    const [services, setServices] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [selectedBarberId, setSelectedBarberId] = useState('');
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
            const response = await api.get('/available-times');
            setAvailableTimes(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            toast.error('Erro ao buscar horários disponíveis.');
            console.error('Erro ao buscar horários disponíveis:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await api.get('/servicos');
            setServices(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            toast.error('Erro ao buscar serviços.');
            console.error('Erro ao buscar serviços:', error);
        }
    };

    const fetchBarbers = async () => {
        try {
            const response = await api.get('/barbers');
            setBarbers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            toast.error('Erro ao buscar barbeiros.');
            console.error('Erro ao buscar barbeiros:', error);
        }
    };

    const handleAddOrUpdateAvailableTime = async () => {
        if (!selectedServiceId || !selectedBarberId || !timeStart || !timeEnd) {
            toast.error('Serviço, barbeiro, horário de início e fim são obrigatórios.');
            return;
        }

        try {
            if (editableRowId) {
                await api.put(`/available-times/${editableRowId}`, {
                    serviceId: selectedServiceId,
                    barberId: selectedBarberId,
                    timeStart,
                    timeEnd
                });
                toast.success('Horário atualizado com sucesso!');
                setEditableRowId(null);
            } else {
                await api.post('/available-times', {
                    serviceId: selectedServiceId,
                    barberId: selectedBarberId,
                    timeStart,
                    timeEnd
                });
                toast.success('Horário adicionado com sucesso!');
            }

            fetchAvailableTimes();
            setSelectedServiceId('');
            setSelectedBarberId('');
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
                await api.delete(`/available-times/${rowToDelete.id}`);
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

    const handleEditClick = (row) => {
        setEditableRowId(row.id);
        setSelectedServiceId(row.serviceId);
        setSelectedBarberId(row.barberId);
        setTimeStart(row.timeStart);
        setTimeEnd(row.timeEnd);
        setIsModalOpen(true);
    };

    const openModalForNewAvailableTime = () => {
        setEditableRowId(null);
        setSelectedServiceId('');
        setSelectedBarberId('');
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
            <TableCell className="text-center px-4 py-2">{getServiceById(row.serviceId)}</TableCell>
            <TableCell className="text-center px-4 py-2">{getBarberById(row.barberId)}</TableCell>
            <TableCell className="text-center px-4 py-2">{row.timeStart} - {row.timeEnd}</TableCell>
            <TableCell className="text-center px-4 py-2">
                <div className="flex justify-center space-x-4">
                    <button onClick={() => handleEditClick(row)}>
                        <Edit3 className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                    </button>
                    <button onClick={() => openConfirmDeleteModal(row)}>
                        <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                    </button>
                </div>
            </TableCell>
        </TableRow>
    ));

    return (
        <div className='p-6 max-w-6xl mx-auto space-y-4'>
            <Link to="/">
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

            {/* Modal de confirmação de exclusão */}
            {isConfirmDeleteOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
                        <p className="mb-4">Você tem certeza que deseja excluir este horário?</p>
                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" onClick={() => setIsConfirmDeleteOpen(false)}>Cancelar</Button>
                            <Button onClick={handleRemoveAvailableTimeItem}>Excluir</Button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">{editableRowId ? 'Editar Horário' : 'Adicionar Horário'}</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700">Serviço</label>
                                <select
                                    name="serviceId"
                                    className="border rounded p-2 w-full"
                                    value={selectedServiceId}
                                    onChange={(e) => setSelectedServiceId(e.target.value)}
                                >
                                    <option value="">Selecione um serviço</option>
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="barberId" className="block text-sm font-medium text-gray-700">Barbeiro</label>
                                <select
                                    name="barberId"
                                    className="border rounded p-2 w-full"
                                    value={selectedBarberId}
                                    onChange={(e) => setSelectedBarberId(e.target.value)}
                                >
                                    <option value="">Selecione um barbeiro</option>
                                    {barbers.map(barber => (
                                        <option key={barber.id} value={barber.id}>
                                            {barber.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="timeStart" className="block text-sm font-medium text-gray-700">Horário de Início</label>
                                <Input
                                    type="time"
                                    name="timeStart"
                                    value={timeStart}
                                    onChange={(e) => setTimeStart(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="timeEnd" className="block text-sm font-medium text-gray-700">Horário de Fim</label>
                                <Input
                                    type="time"
                                    name="timeEnd"
                                    value={timeEnd}
                                    onChange={(e) => setTimeEnd(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-4">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={handleAddOrUpdateAvailableTime}>
                                {editableRowId ? 'Salvar' : 'Adicionar'}
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
