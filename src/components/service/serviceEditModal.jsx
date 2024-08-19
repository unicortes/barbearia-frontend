// src/components/service/serviceEditModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

Modal.setAppElement('#root');

const ServiceEditModal = ({ isOpen, onRequestClose, service, onSave }) => {
  const [formData, setFormData] = useState(service);

  useEffect(() => {
    setFormData(service);
  }, [service]);

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
      contentLabel="Editar Serviço"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className='text-2xl font-bold mb-4'>Editar Serviço</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input name="service" placeholder='Serviço' value={formData.service} onChange={handleInputChange} />
        <Input name="description" placeholder='Descrição' value={formData.description} onChange={handleInputChange} />
        <Input name="price" placeholder='Preço' value={formData.price} onChange={handleInputChange} />
        <div className='flex space-x-4'>
          <Button type="submit">Salvar</Button>
          <Button type="button" onClick={onRequestClose}>Cancelar</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ServiceEditModal;