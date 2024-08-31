import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import api from "@/api/api";
import { Link } from 'react-router-dom';

const DailyScheduleBarber = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate]);

  const fetchAppointments = async (date) => {
    try {
      const response = await api.get(`/appointments?date=${date.toISOString().split('T')[0]}`);
      setAppointments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  const handleStatusChange = async (appointmentId, status) => {
    try {
      await api.patch(`/appointments/${appointmentId}`, { status });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status } : appointment
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status do agendamento:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-center">Agenda do Barbeiro</h1>
      <div className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Nome: {appointment.name}</h3>
              <p>Serviço: {appointment.service.name}</p>
              <p>Horário: {new Date(appointment.appointmentDateTime).toLocaleTimeString()}</p>
              <div className="mt-2 flex justify-end space-x-4">
                <select
                  value={appointment.status}
                  onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                  className="bg-gray-200 p-2 rounded"
                >
                  <option value="PENDENTE">Pendente</option>
                  <option value="CONFIRMADO">Confirmado</option>
                  <option value="CANCELADO">Cancelado</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Nenhum agendamento para este dia.</p>
        )}
      </div>
    </div>
  );
};

export default DailyScheduleBarber;