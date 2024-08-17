// src/components/BarberEditModal.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


Modal.setAppElement('#root');

// eslint-disable-next-line react/prop-types
const BarberEditModal = ({ isOpen, onRequestClose, barber, onSave }) => {
  const [formData, setFormData] = useState(barber);

  useEffect(() => {
    setFormData(barber);
  }, [barber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Barbeiro"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className='text-2xl font-bold mb-4'>Editar Barbeiro</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input name="name" placeholder='Nome' value={formData.name} onChange={handleInputChange} />
        <Input name="email" placeholder='E-mail' value={formData.email} onChange={handleInputChange} />
        <Input name="telephone" placeholder='Telefone' value={formData.telephone} onChange={handleInputChange} />
        <Input name="cpf" placeholder='CPF' value={formData.cpf} onChange={handleInputChange} />
        <Input name="salary" placeholder='Salário' value={formData.salary} onChange={handleInputChange} />
        <div className='flex space-x-4'>
          <Button type="submit">Salvar</Button>
          <Button type="button" onClick={onRequestClose}>Cancelar</Button>
        </div>
      </form>
    </Modal>
  );
};

export default BarberEditModal;
