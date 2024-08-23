import React, { useState, useEffect } from "react";
import api from "@/api/api";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Trash2, Edit } from "lucide-react";

const LoyaltyCard = () => {
  const [cards, setCards] = useState();
  const [newCard, setNewCard] = useState({
    id: "",
    admissionDate: "",
    client: "",
    servicesAquired: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCard();
  }, []);

  const fetchCard = async () => {
    try {
      const response = await api.get("/loyaltyCards");
      setCards(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching loyaltyCards:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!newCard.client) {
      errors.client = "Nome do cliente é obrigatório.";
    }
    if (!newCard.servicesAquired) {
      errors.servicesAquired = "Pontos são obrigatórios.";
    }
    return errors;
  };

  const handleAddOrEditProduct = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const CardData = { ...newCard };

      if (editMode) {
        await api.put(`/loyaltyCards/${newCard.id}`, CardData);
      } else {
        console.log(CardData);
        await api.post("/loyaltyCards/newLoyaltyCard", CardData);
      }

      fetchCard();
      setNewCard({ id: "", client: "", servicesAquired: "" });
      setEditMode(false);
      setErrors({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding/editing loyaltyCards:", error);
    }
  };

  const handleRemoveCard = async (id) => {
    try {
      await api.delete(`/loyaltyCards/${id}`);
      fetchCard();
    } catch (error) {
      console.error("Erro ao remover loyaltyCards:", error);
    }
  };

  const openModalForNewCard = () => {
    setNewCard({ id: "", client: "", servicesAquired: "" });
    setEditMode(false);
    setIsModalOpen(true);
  };

  const openModalForEditCard = (LoyaltyCard) => {
    setNewCard(LoyaltyCard);
    setEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4 w-full">
      <Link to="/">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className="text-3xl font-bold">Cartão</h1>
      <div className="flex justify-end w-full mb-4">
        <Button onClick={openModalForNewCard}>Adicionar produto</Button>
      </div>
      <div className="border rounded w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Número do cartão</TableHead>
              <TableHead>Nome do cliente</TableHead>
              <TableHead>Pontos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(cards) &&
              cards.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.client}</TableCell>
                  <TableCell>{row.servicesAquired}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => openModalForEditCard(row)}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Editar Produto" : "Adicionar Produto"}
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="client"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <Input
                  name="client"
                  placeholder="Nome do cliente"
                  value={newCard.client}
                  onChange={handleInputChange}
                  className={errors.client ? "border-red-500" : ""}
                />
                {errors.client && (
                  <p className="text-red-500">{errors.client}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="servicesAquired"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pontos
                </label>
                <Input
                  name="servicesAquired"
                  placeholder="Pontos"
                  value={newCard.servicesAquired}
                  onChange={handleInputChange}
                  className={errors.servicesAquired ? "border-red-500" : ""}
                />
                {errors.servicesAquired && (
                  <p className="text-red-500">{errors.servicesAquired}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="admissionDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Data de Admissão
                </label>
                <Input
                  type="date"
                  name="admissionDate"
                  placeholder="Data de expiração"
                  value={newCard.admissionDate}
                  onChange={handleInputChange}
                  className={errors.admissionDate ? "border-red-500" : ""}
                />
                {errors.admissionDate && (
                  <p className="text-red-500">{errors.admissionDate}</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddOrEditProduct}>
                {editMode ? "Salvar" : "Adicionar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyCard;
