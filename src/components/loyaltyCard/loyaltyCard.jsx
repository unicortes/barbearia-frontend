// src/components/loyaltyCard/LoyaltyCard.jsx
// src/components/barber/barber.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit } from 'lucide-react';
import LoyaltyCardEditModal from "./LoyaltyCardEditModal.jsx";

const initialCards = [
  { 
    id: 1, 
    date: '17/08/2024', 
    customer: 'João Silva', 
    points: 150 
  },
  { 
    id: 2, 
    date: '14/06/2024', 
    customer: 'Maria Souza', 
    points: 200 
  },
  { 
    id: 3, 
    date: '26/01/2023', 
    customer: 'Pedro Gomes', 
    points: 350 
  },
];

const LoyaltyCard = () => {
  const [cards, setCards] = useState(initialCards);
  const [newCard, setNewCard] = useState({
     date: '', 
     customer: '', 
     points: '' 
  });
  const [editCardId, setEditCardId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prevCard) => ({
      ...prevCard,
      [name]: value
    }));
  };

  const handleAddCard = () => {
    if (!newCard.customer || !newCard.points) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (editCardId) {
      setCards((prevCards) => prevCards.map((card) =>
        card.id === editCardId ? { ...newCard, id: editCardId, date: new Date().toLocaleDateString() } : card
      ));
      setEditCardId(null);
    } else {
      setCards((prevCards) => [
        ...prevCards,
        {
          ...newCard,
          id: cards.length ? Math.max(cards.map(c => c.id)) + 1 : 1,
          date: new Date().toLocaleDateString()
        }
      ]);
    }
    setNewCard({ date: '', customer: '', points: '' });
    setIsModalOpen(false);
  };

  const handleRemoveCard = (id) => {
    setCards((prevCards) => prevCards.filter(card => card.id !== id));
  };

  const handleEditCard = (card) => {
    setNewCard(card);
    setEditCardId(card.id);
    setIsModalOpen(true);
  };

  const tableRows = cards.map((row) => (
    <TableRow key={row.id}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.date}</TableCell>
      <TableCell>{row.customer}</TableCell>
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
  ));

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4 w-full'>
      <h1 className='text-3xl font-bold'>{editCardId ? 'Editar Cartão' : 'Cartões de Fidelidade'}</h1>
      <div className='flex items-center justify-between w-full'>
        <form className='flex items-center gap-2 w-full' onSubmit={(e) => { e.preventDefault(); handleAddCard(); }}>
          <Input name="customer" placeholder='Nome do Cliente' value={newCard.customer} onChange={handleInputChange} />
          <Input name="points" placeholder='Pontos' value={newCard.points} onChange={handleInputChange} />
          <Button type="submit">
            {editCardId ? 'Salvar Alterações' : 'Adicionar Cartão'}
          </Button>
        </form>
      </div>
      <div className='border rounded w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Pontos</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </div>
      <LoyaltyCardEditModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        card={newCard}
        onSave={handleAddCard}
      />
    </div>
  );
};

export default LoyaltyCard;
