// src/components/service/serviceForm.jsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    service: '',
    description: '',
    price: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.service || !formData.description || !formData.price) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    alert("Serviço cadastrado com sucesso!");
    navigate('/services');
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4'>
      <h1 className='text-3xl font-bold'>Cadastrar Serviço</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input name="service" placeholder='Nome do serviço' value={formData.service} onChange={handleInputChange} />
        <Input name="description" placeholder='Descrição do serviço' value={formData.description} onChange={handleInputChange} />
        <Input name="price" placeholder='Preço do serviço' value={formData.price} onChange={handleInputChange} />
        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
};

export default ServiceForm;