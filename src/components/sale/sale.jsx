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
import { Edit, Trash2 } from "lucide-react";

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
    disponibilidade: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await api.get("/promocoes");
      setSales(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setNewSale((prevSale) => ({
      ...prevSale,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!newSale.titulo) {
      errors.titulo = "Nome da venda é obrigatório.";
    }
    if (!newSale.descricao) {
      errors.descricao = "Descrição da venda é obrigatória.";
    }
    if (!newSale.codigoPromocao) {
      errors.codigoPromocao = "Código promocional é obrigatório.";
    }
    if (!newSale.desconto || isNaN(newSale.desconto)) {
      errors.desconto = "Desconto é obrigatório e deve ser um número válido.";
    }
    if (!newSale.dataFim) {
      errors.dataFim = "Data de expiração é obrigatória.";
    }
    if (!newSale.categoria) {
      errors.categoria = "Categoria é obrigatória.";
    }
    if (!newSale.disponibilidade) {
      errors.disponibilidade = "Disponibilidade é obrigatória.";
    }
    return errors;
  };

  const handleAddSale = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const saleData = { ...newSale };

      if (editMode) {
        await api.put(`/promocoes/${newSale.id}`, saleData);
      } else {
        console.log(saleData);
        await api.post("/promocoes", saleData);
      }

      fetchSales();
      setNewSale({
        id: "",
        titulo: "",
        descricao: "",
        codigoPromocao: "",
        desconto: "",
        dataFim: "",
        categoria: "",
        disponibilidade: "",
      });
      setEditMode(false);
      setErrors({});
    } catch (error) {
      console.error("Error adding/editing sale:", error);
    }
  };

  const handleRemoveSale = async (id) => {
    try {
      await api.delete(`/promocoes/${id}`);
      fetchSales();
    } catch (error) {
      console.error("Erro ao remover venda:", error);
    }
  };

  const handleEditSale = (sale) => {
    setNewSale(sale);
    setEditMode(true);
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
      <h1 className="text-3xl font-bold">
        {editMode ? "Editar promoção" : "Promoções"}
      </h1>
      <div className="flex items-center justify-between w-full">
        <form
          className="flex items-center gap-2 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddSale();
          }}
        >
          <Input
            name="titulo"
            placeholder="Nome da venda"
            value={newSale.titulo}
            onChange={handleInputChange}
          />
          {errors.titulo && <p className="text-red-500">{errors.titulo}</p>}
          <Input
            name="descricao"
            placeholder="Descrição"
            value={newSale.descricao}
            onChange={handleInputChange}
            className={errors.descricao ? "border-red-500" : ""}
          />
          {errors.descricao && (
            <p className="text-red-500">{errors.descricao}</p>
          )}
          <Input
            name="codigoPromocao"
            placeholder="Código promocional"
            value={newSale.codigoPromocao}
            onChange={handleInputChange}
            className={errors.codigoPromocao ? "border-red-500" : ""}
          />
          {errors.codigoPromocao && (
            <p className="text-red-500">{errors.codigoPromocao}</p>
          )}
          <Input
            name="desconto"
            placeholder="Desconto"
            value={newSale.desconto}
            onChange={handleInputChange}
            className={errors.desconto ? "border-red-500" : ""}
          />
          {errors.desconto && <p className="text-red-500">{errors.desconto}</p>}
          <Input
            type="date"
            name="dataInicio"
            placeholder="Data de expiração"
            value={newSale.dataInicio}
            onChange={handleInputChange}
            className={errors.dataInicio ? "border-red-500" : ""}
          />
          {errors.dataInicio && (
            <p className="text-red-500">{errors.dataInicio}</p>
          )}
          <Input
            type="date"
            name="dataFim"
            placeholder="Data de expiração"
            value={newSale.dataFim}
            onChange={handleInputChange}
            className={errors.dataFim ? "border-red-500" : ""}
          />
          {errors.dataFim && <p className="text-red-500">{errors.dataFim}</p>}
          <Input
            name="categoria"
            placeholder="Categoria"
            value={newSale.categoria}
            onChange={handleInputChange}
            className={errors.categoria ? "border-red-500" : ""}
          />
          {errors.categoria && (
            <p className="text-red-500">{errors.categoria}</p>
          )}
          <input
            type="checkbox"
            name="disponibilidade"
            checked={newSale.disponibilidade}
            onChange={handleInputChange}
            className={errors.disponibilidade ? "border-red-500" : ""}
          />
          {errors.disponibilidade && (
            <p className="text-red-500">{errors.disponibilidade}</p>
          )}

          <Button type="submit">
            {editMode ? "Salvar Alterações" : "Adicionar venda"}
          </Button>
        </form>
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
                  <TableCell>{row.disponibilidade}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditSale(row)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveSale(row.id)}
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

export default Sale;
