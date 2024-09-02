import { useState, useEffect } from 'react';
import api from '@/api/api';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";

const AdminSchedule = () => {
  const [barbers, setBarbers] = useState([]);

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
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="5" className="border p-2 text-center">Nenhum agendamento para este barbeiro.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">Nenhum barbeiro encontrado.</p>
      )}
    </div>
  );
};

export default AdminSchedule;