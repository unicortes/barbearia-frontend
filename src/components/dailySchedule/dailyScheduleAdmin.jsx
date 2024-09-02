import React, { useState, useEffect } from 'react';
import api from '@/api/api';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSchedule = () => {
  const [barbers, setBarbers] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    fetchBarbersAndAppointments();
  }, []);

  const fetchBarbersAndAppointments = async () => {
    try {
      const response = await api.get('/barbers/appointments');
      setBarbers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar barbeiros e agendamentos:', error);
      setBarbers([]);
    }
  };

  const handleRemoveAppointment = async () => {
    try {
      if (selectedAppointmentId) {
        await api.delete(`/appointments/${selectedAppointmentId}`);
        fetchBarbersAndAppointments();
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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Agendamentos dos Barbeiros</h1>
      {Array.isArray(barbers) && barbers.length > 0 ? (
        barbers.map(barber => (
          <div key={barber.id} className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{barber.name}</h2>
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow>
                  <TableHead className="border p-2">Cliente</TableHead>
                  <TableHead className="border p-2">Serviço</TableHead>
                  <TableHead className="border p-2">Data</TableHead>
                  <TableHead className="border p-2">Horário</TableHead>
                  <TableHead className="border p-2">Status</TableHead>
                  <TableHead className="border p-2">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {barber.appointments.length > 0 ? (
                  barber.appointments.map(appointment => (
                    <TableRow key={appointment.id}>
                      <TableCell className="border p-2">{appointment.clientName}</TableCell>
                      <TableCell className="border p-2">{appointment.service.name}</TableCell>
                      <TableCell className="border p-2">{new Date(appointment.appointmentDateTime).toLocaleDateString()}</TableCell>
                      <TableCell className="border p-2">{new Date(appointment.appointmentDateTime).toLocaleTimeString()}</TableCell>
                      <TableCell className="border p-2">{appointment.status}</TableCell>
                      <TableCell className="border p-2 text-center">
                        <Button onClick={() => openConfirmDeleteModal(appointment.id)} variant="destructive">
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="6" className="border p-2 text-center">Nenhum agendamento para este barbeiro.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">Nenhum barbeiro encontrado.</p>
      )}

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

export default AdminSchedule;
