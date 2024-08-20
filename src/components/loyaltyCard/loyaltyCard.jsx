// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { Trash2, Edit } from 'lucide-react';

const initialRows = [
  {
    id: 1,
    date: '17/08/2024',
    cardNumber: '1234567890',
    customerName: 'Paulo',
    points: '50'
  },
  {
    id: 2,
    date: '14/06/2024',
    cardNumber: '0987654321',
    customerName: 'Pedrinho',
    points: '30'
  }
];

const LoyaltyCard = () => {
  const [cards, setCards] = useState(initialRows);
  const [newCard, setNewCard] = useState({
    id: '',
    date: '',
    cardNumber: '',
    customerName: '',
    points: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prevCard) => ({
      ...prevCard,
      [name]: value
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!newCard.cardNumber) {
      errors.cardNumber = "Número do cartão é obrigatório.";
    }
    if (!newCard.customerName) {
      errors.customerName = "Nome do cliente é obrigatório.";
    }
    if (!newCard.points) {
      errors.points = "Pontos são obrigatórios.";
    }
    return errors;
  };

  const handleAddCard = () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    if (editMode) {
      handleSaveEdit(newCard);
    } else {
      const newId = cards.length > 0 ? cards[cards.length - 1].id + 1 : 1;
      setCards((prevCards) => [
        ...prevCards,
        {
          ...newCard,
          id: newId,
          date: new Date().toLocaleDateString()
        }
      ]);
    }

    setNewCard({ id: '', date: '', cardNumber: '', customerName: '', points: '' });
    setEditMode(false);
    setErrors({});
  };

  const handleRemoveCard = (id) => {
    setCards((prevCards) => prevCards.filter(card => card.id !== id));
  };

  const handleEditCard = (card) => {
    setNewCard(card);
    setEditMode(true);
  };

  const handleSaveEdit = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === updatedCard.id ? { ...updatedCard, date: new Date().toLocaleDateString() } : card
      )
    );
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4 w-full'>
      <Link to="/">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className='text-3xl font-bold'>{editMode ? 'Editar Cartão de Fidelidade' : 'Cartões de Fidelidade'}</h1>
      <div className='flex items-center justify-between w-full'>
        <form className='flex items-center gap-2 w-full' onSubmit={(e) => { e.preventDefault(); handleAddCard(); }}>
          <Input
            name="cardNumber"
            placeholder='Número do cartão'
            value={newCard.cardNumber}
            onChange={handleInputChange}
            className={errors.cardNumber ? 'border-red-500' : ''}
          />
          {errors.cardNumber && <p className='text-red-500'>{errors.cardNumber}</p>}
          <Input
            name="customerName"
            placeholder='Nome do cliente'
            value={newCard.customerName}
            onChange={handleInputChange}
            className={errors.customerName ? 'border-red-500' : ''}
          />
          {errors.customerName && <p className='text-red-500'>{errors.customerName}</p>}
          <Input
            name="points"
            placeholder='Pontos'
            value={newCard.points}
            onChange={handleInputChange}
            className={errors.points ? 'border-red-500' : ''}
          />
          {errors.points && <p className='text-red-500'>{errors.points}</p>}
          <Button type="submit">
            {editMode ? 'Salvar Alterações' : 'Adicionar Cartão'}
          </Button>
        </form>
      </div>
      <div className='border rounded w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data de Emissão</TableHead>
              <TableHead>Número do Cartão</TableHead>
              <TableHead>Nome do Cliente</TableHead>
              <TableHead>Pontos</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.cardNumber}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.points}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditCard(row)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveCard(row.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LoyaltyCard;
