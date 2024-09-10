import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import api from "@/api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

const DailyScheduleClient = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    barber: '',
    service: '',
    availableTime: '',
    clientName: '',
    appointmentDateTime: '',
    status: 'PENDENTE',
    available: true,
  });
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    fetchBarbers();
    fetchServices();
  }, []);

  useEffect(() => {
    if (newAppointment.barber && newAppointment.service) {
      fetchAvailableTimes(newAppointment.barber, newAppointment.service);
    }
  }, [newAppointment.barber, newAppointment.service]);

  const fetchBarbers = async () => {
    try {
      const response = await api.get("/api/barber");
      setBarbers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar barbeiros:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get("/api/servicos");
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  const fetchAvailableTimes = async (service) => {
    try {
      const response = await api.get(`/api/available-times?service=${service}`);
      console.log("Fetched Available Times:", response.data);
      if (Array.isArray(response.data)) {
        const formattedTimes = response.data.map(time => ({
          ...time,
          timeStart: dayjs(time.timeStart).format('HH:mm'), 
          timeEnd: dayjs(time.timeEnd).format('HH:mm'), 
        }));
        setAvailableTimes(formattedTimes);
      }
    } catch (error) {
      console.error("Erro ao buscar horários disponíveis:", error);
    }
  };

  const handleDateClick = (date) => {
    if (date instanceof Date) {
      setSelectedDate(date);
      setIsModalOpen(true);
    } else {
      console.error("Data inválida recebida:", date);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Change - ${name}: ${value}`); 
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateAppointment = async () => {
    try {
      if (!selectedDate || !newAppointment.availableTime) {
        toast.error('Selecione a data e o horário.');
        return;
      }
      const selectedTime = availableTimes.find(time => time.id === parseInt(newAppointment.availableTime, 10));
      
      if (!selectedTime) {
        toast.error('Horário selecionado é inválido.');
        return;
      }

      const timeStart = selectedTime.timeStart; 
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      const appointmentDateTime = `${formattedDate}T${timeStart}:00`;

      const appointmentData = {
        ...newAppointment,
        barber: parseInt(newAppointment.barber, 10),
        service: parseInt(newAppointment.service, 10),
        availableTime: parseInt(newAppointment.availableTime, 10),
        appointmentDateTime,
      };
      await api.post("/api/appointments", appointmentData);
      setIsModalOpen(false);
      setNewAppointment({
        barber: '',
        service: '',
        availableTime: '',
        clientName: '',
        appointmentDateTime: '',
        status: 'PENDENTE', 
        available: true,
      });
      setAvailableTimes([]);
      toast.success('Agendamento criado com sucesso!');
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      toast.error('Erro ao criar agendamento.');
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      if (appointmentToDelete) {
        await api.delete(`/api/appointments/${appointmentToDelete}`);
        toast.success('Agendamento removido com sucesso!');
        setAppointmentToDelete(null);
        setIsConfirmDeleteOpen(false);
      }
    } catch (error) {
      toast.error('Erro ao remover agendamento.');
      console.error('Erro ao remover agendamento:', error);
    }
  };

  const openConfirmDeleteModal = (appointmentId) => {
    setAppointmentToDelete(appointmentId);
    setIsConfirmDeleteOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(false);
    setAppointmentToDelete(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/pageHome">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-center">Agendamento Cliente</h1>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={({ date, view }) =>
          view === 'month' && date.getDay() === 0 ? 'text-red-500' : null
        }
        className="rounded-lg shadow-lg border border-gray-200 w-full max-w-2xl"
      />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4">Novo Agendamento</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="barber" className="block text-sm font-medium text-gray-700">Barbeiro</label>
                <select
                  name="barber"
                  className="border rounded p-2 w-full"
                  value={newAppointment.barber}
                  onChange={handleInputChange}
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
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">Serviço</label>
                <select
                  name="service"
                  className="border rounded p-2 w-full"
                  value={newAppointment.service}
                  onChange={handleInputChange}
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
                <label htmlFor="availableTime" className="block text-sm font-medium text-gray-700">Horário Disponível</label>
                <select
                  name="availableTime"
                  className="border rounded p-2 w-full"
                  value={newAppointment.availableTime}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione um horário</option>
                  {availableTimes.map((time) => (
                    <option key={time.id} value={time.id}>
                      {time.timeStart} - {time.timeEnd}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
                <Input
                  name="clientName"
                  value={newAppointment.clientName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={handleCreateAppointment} className="bg-blue-500 text-white">Confirmar</Button>
                <Button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white">Cancelar</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
            <p>Você tem certeza de que deseja excluir este agendamento?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <Button onClick={handleDeleteAppointment} className="bg-red-500 text-white">Excluir</Button>
              <Button onClick={closeConfirmDeleteModal} className="bg-gray-500 text-white">Cancelar</Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default DailyScheduleClient;
