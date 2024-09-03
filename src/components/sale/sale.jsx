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
    titulo: "",
    descricao: "",
    codigoPromocao: "",
    desconto: "",
    dataFim: "",
    dataInicio: "",
    categoria: "",
    disponibilidade: false,
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
      const response = await api.get("/api/promocoes");
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
    if (!newSale.titulo) errors.titulo = "Nome da venda é obrigatório.";
    if (!newSale.descricao) errors.descricao = "Descrição da venda é obrigatória.";
    if (!newSale.codigoPromocao) errors.codigoPromocao = "Código promocional é obrigatório.";
    if (!newSale.desconto || isNaN(newSale.desconto)) errors.desconto = "Desconto é obrigatório e deve ser um número válido.";
    if (!newSale.dataFim) errors.dataFim = "Data de expiração é obrigatória.";
    if (!newSale.categoria) errors.categoria = "Categoria é obrigatória.";
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
        await api.put(`/api/promocoes/${newSale.id}`, saleData);
        toast.success("Promoção atualizada com sucesso!");
      } else {
        await api.post("/api/promocoes", saleData);
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
      await api.delete(`/api/promocoes/${saleToDelete.id}`);
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
      titulo: "",
      descricao: "",
      codigoPromocao: "",
      desconto: "",
      dataFim: "",
      dataInicio: "",
      categoria: "",
      disponibilidade: false,
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
      titulo: "",
      descricao: "",
      codigoPromocao: "",
      desconto: "",
      dataFim: "",
      dataInicio: "",
      categoria: "",
      disponibilidade: false,
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
                <TableCell>{row.titulo}</TableCell>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>{row.codigoPromocao}</TableCell>
                <TableCell>{row.desconto}%</TableCell>
                <TableCell>{formatDate(row.dataFim)}</TableCell>
                <TableCell>{row.categoria}</TableCell>
                <TableCell>{row.disponibilidade ? "Sim" : "Não"}</TableCell>
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
                name="titulo"
                placeholder="Nome da Promoção"
                value={newSale.titulo}
                onChange={handleInputChange}
                error={errors.titulo}
              />
              <Input
                name="descricao"
                placeholder="Descrição"
                value={newSale.descricao}
                onChange={handleInputChange}
                error={errors.descricao}
              />
              <Input
                name="codigoPromocao"
                placeholder="Código Promocional"
                value={newSale.codigoPromocao}
                onChange={handleInputChange}
                error={errors.codigoPromocao}
              />
              <Input
                name="desconto"
                placeholder="Desconto (%)"
                type="number"
                value={newSale.desconto}
                onChange={handleInputChange}
                error={errors.desconto}
              />
              <Input
                name="dataFim"
                placeholder="Data de Expiração"
                type="date"
                value={newSale.dataFim}
                onChange={handleInputChange}
                error={errors.dataFim}
              />
              <Input
                name="categoria"
                placeholder="Categoria"
                value={newSale.categoria}
                onChange={handleInputChange}
                error={errors.categoria}
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="disponibilidade"
                  checked={newSale.disponibilidade}
                  onChange={handleInputChange}
                />
                <label htmlFor="disponibilidade">Disponibilidade</label>
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
