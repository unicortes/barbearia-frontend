// src/components/loyaltyCard/loyaltyCardForm.jsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

const LoyaltyCardForm = () => {
  const [formData, setFormData] = useState({
    customer: '',
    points: ''
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
    if (!formData.customer || !formData.points) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    alert("Cartão de Fidelidade cadastrado com sucesso!");
    navigate('/loyaltyCards');
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4'>
      <h1 className='text-3xl font-bold'>Cadastro de Cartão de Fidelidade</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Input 
          name="customer" 
          placeholder='Nome do Cliente' 
          value={formData.customer} 
          onChange={handleInputChange} 
        />
        <Input 
          name="points" 
          placeholder='Pontos' 
          value={formData.points} 
          onChange={handleInputChange} 
        />
        <Button type="submit" className='mt-4'>
          Salvar
        </Button>
      </form>
    </div>
  );
};

export default LoyaltyCardForm;
