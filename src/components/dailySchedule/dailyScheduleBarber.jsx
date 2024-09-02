import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import api from "@/api/api";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DailyScheduleBarber = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate]);

  const fetchAppointments = async (date) => {
    try {
      const response = await api.get(`/api/appointments?date=${date.toISOString().split('T')[0]}`);
      setAppointments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  const handleStatusChange = async (appointmentId, status) => {
    try {
      await api.patch(`/api/appointments/${appointmentId}`, { status });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status } : appointment
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status do agendamento:", error);
    }
  };

  const handleRemoveAppointment = async () => {
    try {
      if (selectedAppointmentId) {
        await api.delete(`/api/appointments/${selectedAppointmentId}`);
        fetchAppointments(selectedDate);
        toast.success('Agendamento removido com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao remover agendamento.');
      console.error('Erro ao remover agendamento:', error);
    } finally {
      closeConfirmDeleteModal();
    }
  };

  const openConfirmDeleteModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsConfirmDeleteOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(false);
    setSelectedAppointmentId(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/pageHome">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-center">Agenda do Barbeiro</h1>
      <div className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className={`border p-4 rounded-lg ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} // Linhas com cores alternadas
            >
              <h3 className="text-lg font-semibold">Nome: {appointment.name}</h3>
              <p>Serviço: {appointment.service.name}</p>
              <p>Horário: {new Date(appointment.appointmentDateTime).toLocaleTimeString()}</p>
              <div className="mt-2 flex justify-between items-center">
                <select
                  value={appointment.status}
                  onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                  className="bg-gray-200 p-2 rounded"
                >
                  <option value="PENDENTE">Pendente</option>
                  <option value="CONFIRMADO">Confirmado</option>
                  <option value="CANCELADO">Cancelado</option>
                </select>
                <Button onClick={() => openConfirmDeleteModal(appointment.id)} variant="destructive">
                  Excluir
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Nenhum agendamento para este dia.</p>
        )}
      </div>

      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir este agendamento?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <Button variant="outline" onClick={closeConfirmDeleteModal}>
                Cancelar
              </Button>
              <Button onClick={handleRemoveAppointment} variant="destructive">
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default DailyScheduleBarber;
