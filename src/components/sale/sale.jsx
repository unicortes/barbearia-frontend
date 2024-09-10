import React, { useState, useEffect } from "react";
import api from "@/api/api";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Edit, Trash2 } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sale = () => {
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({
    id: "",
    name: "",
    description: "",
    promotionCode: "",
    discount: "",
    endDate: "",
    startDate: "",
    category: "",
    availability: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await api.get('/api/promotions');
      setSales(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error("Erro ao buscar promoções.");
      console.error("Error fetching sales:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setNewSale((prevSale) => ({
      ...prevSale,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!newSale.name) errors.name = "Nome da promoção é obrigatório.";
    if (!newSale.description) errors.descricao = "Descrição da venda é obrigatória.";
    if (!newSale.promotionCode) errors.promotionCode = "Código promocional é obrigatório.";
    if (!newSale.discount || isNaN(newSale.discount)) errors.discount = "Desconto é obrigatório e deve ser um número válido.";
    if (!newSale.startDate) errors.startDate = "Data de início é obrigatória.";
    if (!newSale.endDate) errors.endDate = "Data de expiração é obrigatória.";
    if (!newSale.category) errors.category = "Categoria é obrigatória.";
    if (newSale.availability === "") errors.availability = "Disponibilidade é obrigatória.";
    return errors;
  };

  const handleAddOrEditSale = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const saleData = { ...newSale };
      if (editMode) {
        await api.put(`/api/promotions/${newSale.id}`, saleData);
        toast.success("Promoção atualizada com sucesso!");
      } else {
        await api.post('/api/promotions', saleData);
        toast.success("Promoção adicionada com sucesso!");
      }

      fetchSales();
      resetForm();
    } catch (error) {
      toast.error("Erro ao adicionar/editar promoção.");
      console.error("Error adding/editing sale:", error);
    }
  };

  const handleRemoveSale = async () => {
    if (!saleToDelete) return;

    try {
      await api.delete(`/api/promotions/${saleToDelete.id}`);
      fetchSales();
      setIsConfirmDeleteOpen(false);  // Fechar o modal de confirmação
      setSaleToDelete(null);          // Limpar o estado da venda a ser deletada
      toast.success("Promoção removida com sucesso!"); // Exibir mensagem de sucesso
    } catch (error) {
      toast.error("Erro ao remover promoção."); // Exibir mensagem de erro
      console.error("Erro ao remover venda:", error);
    }
  };

  const openModalForNewSale = () => {
    setNewSale({
      id: "",
      name: "",
      description: "",
      promotionCode: "",
      discount: "",
      endDate: "",
      startDate: "",
      category: "",
      availability: '',
    });
    setEditMode(false);
    setIsModalOpen(true);
  };

  const openModalForEditSale = (sale) => {
    setNewSale(sale);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const openConfirmDeleteModal = (sale) => {
    setSaleToDelete(sale);
    setIsConfirmDeleteOpen(true);
  };

  const resetForm = () => {
    setNewSale({
      id: "",
      name: "",
      description: "",
      promotionCode: "",
      discount: "",
      endDate: "",
      startDate: "",
      category: "",
      availability: '',
    });
    setEditMode(false);
    setErrors({});
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4 w-full">
      <Link to="/pageHome">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className="text-3xl font-bold">Promoções</h1>
      <div className="flex justify-end mb-4">
        <Button onClick={openModalForNewSale}>Adicionar promoção</Button>
      </div>
      <div className="border rounded w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Código Promocional</TableHead>
              <TableHead>Desconto</TableHead>
              <TableHead>Data de Início</TableHead>
              <TableHead>Data de Expiração</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Disponibilidade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((row, index) => (
              <TableRow key={row.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.promotionCode}</TableCell>
                <TableCell>{row.discount}%</TableCell>
                <TableCell>{formatDate(row.startDate)}</TableCell>
                <TableCell>{formatDate(row.endDate)}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.availability ? "Sim" : "Não"}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => openModalForEditSale(row)}>
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => openConfirmDeleteModal(row)}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal de confirmação de exclusão */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Confirmação</h2>
            <p className="mb-4">Deseja realmente excluir esta promoção?</p>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsConfirmDeleteOpen(false)}>Cancelar</Button>
              <Button onClick={handleRemoveSale}>Excluir</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição/adicionar nova promoção */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-bold mb-4">{editMode ? "Editar Promoção" : "Adicionar Promoção"}</h2>
            <div className="grid grid-cols-1 gap-4">
              <Input
                name="name"
                placeholder="Nome da Promoção"
                value={newSale.name}
                onChange={handleInputChange}
                error={errors.name}
              />
              <Input
                name="description"
                placeholder="Descrição"
                value={newSale.description}
                onChange={handleInputChange}
                error={errors.description}
              />
              <Input
                name="promotionCode"
                placeholder="Código Promocional"
                value={newSale.promotionCode}
                onChange={handleInputChange}
                error={errors.promotionCode}
              />
              <Input
                name="discount"
                placeholder="Desconto (%)"
                type="number"
                value={newSale.discount}
                onChange={handleInputChange}
                error={errors.discount}
              />
              <Input
                name="startDate"
                placeholder="Data de Inicio"
                type="date"
                value={newSale.startDate}
                onChange={handleInputChange}
                error={errors.startDate}
              />
              <Input
                name="endDate"
                placeholder="Data de Expiração"
                type="date"
                value={newSale.endDate}
                onChange={handleInputChange}
                error={errors.endDate}
              />
              <Input
                name="category"
                placeholder="Categoria"
                value={newSale.category}
                onChange={handleInputChange}
                error={errors.category}
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="availability"
                  checked={newSale.availability}
                  onChange={handleInputChange}
                />
                <label htmlFor="availability">Disponibilidade</label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button onClick={resetForm}>Cancelar</Button>
                <Button onClick={handleAddOrEditSale}>{editMode ? "Atualizar" : "Adicionar"}</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Sale;