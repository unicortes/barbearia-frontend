import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import api from "@/api/api";

const DailyScheduleClient = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    barberId: '',
    serviceId: '',
    availableTimeId: '',
    name: '',
    appointmentDateTime: '',
    status: 'PENDENTE', // Status padrão
    available: true,
  });

  useEffect(() => {
    fetchBarbers();
    fetchServices();
  }, []);

  useEffect(() => {
    if (newAppointment.barberId && newAppointment.serviceId) {
      fetchAvailableTimes(newAppointment.barberId, newAppointment.serviceId);
    }
  }, [newAppointment.barberId, newAppointment.serviceId]);

  const fetchBarbers = async () => {
    try {
      const response = await api.get("/barbers");
      setBarbers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar barbeiros:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get("/services");
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  const fetchAvailableTimes = async (barberId, serviceId) => {
    try {
      const response = await api.get(`/available-times?barberId=${barberId}&serviceId=${serviceId}`);
      setAvailableTimes(Array.isArray(response.data) ? response.data : []);
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
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateAppointment = async () => {
    try {
      const appointmentData = {
        ...newAppointment,
        appointmentDateTime: `${selectedDate.toISOString().split("T")[0]}T${newAppointment.availableTimeId}`,
      };
      await api.post("/appointments", appointmentData);
      setIsModalOpen(false);
      setNewAppointment({
        barberId: '',
        serviceId: '',
        availableTimeId: '',
        name: '',
        appointmentDateTime: '',
        status: 'PENDENTE', // Resetar status padrão ao criar um novo agendamento
        available: true,
      });
      setAvailableTimes([]);
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/">
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
                <label htmlFor="barberId" className="block text-sm font-medium text-gray-700">Barbeiro</label>
                <select
                  name="barberId"
                  className="border rounded p-2 w-full"
                  value={newAppointment.barberId}
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
                <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700">Serviço</label>
                <select
                  name="serviceId"
                  className="border rounded p-2 w-full"
                  value={newAppointment.serviceId}
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
                <label htmlFor="availableTimeId" className="block text-sm font-medium text-gray-700">Horário Disponível</label>
                <select
                  name="availableTimeId"
                  className="border rounded p-2 w-full"
                  value={newAppointment.availableTimeId}
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                <Input
                  type="text"
                  name="name"
                  value={newAppointment.name}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateAppointment}>Agendar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyScheduleClient;
