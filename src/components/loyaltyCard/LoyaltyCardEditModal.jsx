// src/components/loyaltyCard/loyaltyCardEditModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

Modal.setAppElement('#root');

const LoyaltyCardEditModal = ({ isOpen, onRequestClose, card, onSave }) => {
  const [formData, setFormData] = useState(card);

  useEffect(() => {
    setFormData(card);
  }, [card]);

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
      contentLabel="Editar Cartão de Fidelidade"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className='text-2xl font-bold mb-4'>Editar Cartão de Fidelidade</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input name="customer" placeholder='Nome do Cliente' value={formData.customer} onChange={handleInputChange} />
        <Input name="points" placeholder='Pontos' value={formData.points} onChange={handleInputChange} />
        <div className='flex space-x-4'>
          <Button type="submit">Salvar</Button>
          <Button type="button" onClick={onRequestClose}>Cancelar</Button>
        </div>
      </form>
    </Modal>
  );
};

export default LoyaltyCardEditModal;
