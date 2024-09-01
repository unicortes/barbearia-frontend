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

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await api.get("/promocoes");
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
        await api.put(`/promocoes/${newSale.id}`, saleData);
        toast.success("Promoção atualizada com sucesso!");
      } else {
        await api.post("/promocoes", saleData);
        toast.success("Promoção adicionada com sucesso!");
      }

      fetchSales();
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
    } catch (error) {
      toast.error("Erro ao adicionar/editar promoção.");
      console.error("Error adding/editing sale:", error);
    }
  };

  const handleRemoveSale = async (id) => {
    try {
      await api.delete(`/promocoes/${id}`);
      fetchSales();
      toast.success("Promoção removida com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover promoção.");
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

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4 w-full">
      <Link to="/">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className="text-3xl font-bold">Promoções</h1>
      <div className="flex justify-end w-full mb-4">
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
            {Array.isArray(sales) &&
              sales.map((row) => (
                <TableRow key={row.id}>
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
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveSale(row.id)}>
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
            <h2 className="text-xl font-bold mb-4">{editMode ? "Editar Promoção" : "Adicionar Promoção"}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Nome</label>
                <Input
                  name="titulo"
                  placeholder="Nome da promoção"
                  value={newSale.titulo}
                  onChange={handleInputChange}
                  className={errors.titulo ? "border-red-500" : ""}
                />
                {errors.titulo && <p className="text-red-500">{errors.titulo}</p>}
              </div>
              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                <Input
                  name="descricao"
                  placeholder="Descrição"
                  value={newSale.descricao}
                  onChange={handleInputChange}
                  className={errors.descricao ? "border-red-500" : ""}
                />
                {errors.descricao && <p className="text-red-500">{errors.descricao}</p>}
              </div>
              <div>
                <label htmlFor="codigoPromocao" className="block text-sm font-medium text-gray-700">Código Promocional</label>
                <Input
                  name="codigoPromocao"
                  placeholder="Código promocional"
                  value={newSale.codigoPromocao}
                  onChange={handleInputChange}
                  className={errors.codigoPromocao ? "border-red-500" : ""}
                />
                {errors.codigoPromocao && <p className="text-red-500">{errors.codigoPromocao}</p>}
              </div>
              <div>
                <label htmlFor="desconto" className="block text-sm font-medium text-gray-700">Desconto</label>
                <Input
                  name="desconto"
                  placeholder="Desconto"
                  value={newSale.desconto}
                  onChange={handleInputChange}
                  className={errors.desconto ? "border-red-500" : ""}
                />
                {errors.desconto && <p className="text-red-500">{errors.desconto}</p>}
              </div>
              <div>
                <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700">Data de Início</label>
                <Input
                  type="date"
                  name="dataInicio"
                  value={newSale.dataInicio}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700">Data de Expiração</label>
                <Input
                  type="date"
                  name="dataFim"
                  value={newSale.dataFim}
                  onChange={handleInputChange}
                  className={errors.dataFim ? "border-red-500" : ""}
                />
                {errors.dataFim && <p className="text-red-500">{errors.dataFim}</p>}
              </div>
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
                <Input
                  name="categoria"
                  placeholder="Categoria"
                  value={newSale.categoria}
                  onChange={handleInputChange}
                  className={errors.categoria ? "border-red-500" : ""}
                />
                {errors.categoria && <p className="text-red-500">{errors.categoria}</p>}
              </div>
              <div>
                <label htmlFor="disponibilidade" className="block text-sm font-medium text-gray-700">Disponível?</label>
                <input
                  type="checkbox"
                  name="disponibilidade"
                  checked={newSale.disponibilidade}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button onClick={handleAddOrEditSale}>
                  {editMode ? "Atualizar" : "Salvar"}
                </Button>
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
