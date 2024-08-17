// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

const BarberForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    cpf: '',
    salary: ''
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
    if (!formData.name || !formData.email || !formData.telephone || !formData.cpf || !formData.salary) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    alert("Barbeiro cadastrado com sucesso!");
    navigate('/barbers');
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4'>
      <h1 className='text-3xl font-bold'>Cadastro de Barbeiro</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input name="name" placeholder='Nome' value={formData.name} onChange={handleInputChange} />
        <Input name="email" placeholder='E-mail' value={formData.email} onChange={handleInputChange} />
        <Input name="telephone" placeholder='Telefone' value={formData.telephone} onChange={handleInputChange} />
        <Input name="cpf" placeholder='CPF' value={formData.cpf} onChange={handleInputChange} />
        <Input name="salary" placeholder='Salário' value={formData.salary} onChange={handleInputChange} />
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
};

export default BarberForm;
