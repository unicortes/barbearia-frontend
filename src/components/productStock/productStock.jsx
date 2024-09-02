import React, { useState, useEffect } from 'react';
import api from '@/api/api';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const statusOptions = ["EM_USO", "LACRADO"];

const ProductStock = () => {
  const [stockRows, setStockRows] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [editableRowId, setEditableRowId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStock();
    fetchProducts();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await api.get('/api/stocks');
      setStockRows(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error('Erro ao buscar o estoque.');
      console.error('Erro ao buscar o estoque:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products');
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error('Erro ao buscar produtos.');
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!selectedProductId) {
      errors.selectedProductId = "Produto é obrigatório.";
    }
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      errors.quantity = "Quantidade é obrigatória e deve ser um número positivo.";
    }
    if (!selectedStatus) {
      errors.selectedStatus = "Status é obrigatório.";
    }
    return errors;
  };

  const handleAddOrUpdateStock = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      console.error(fieldErrors);
      toast.error('Produto, quantidade e status são obrigatórios.');
      return;
    }

    try {
      if (editableRowId) {
        await api.put(`/api/stocks/${editableRowId}`, {
          productId: selectedProductId,
          quantity: parseInt(quantity, 10),
          status: selectedStatus
        });
        toast.success('Estoque atualizado com sucesso!');
        setEditableRowId(null);
      } else {
        await api.post('/api/stocks', {
          productId: selectedProductId,
          quantity: parseInt(quantity, 10),
          status: selectedStatus
        });
        toast.success('Item de estoque adicionado com sucesso!');
      }

      fetchStock();
      setSelectedProductId('');
      setQuantity('');
      setSelectedStatus('');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Erro ao adicionar/atualizar o estoque.');
      console.error('Erro ao adicionar/atualizar o estoque:', error);
    }
  };

  const handleRemoveStockItem = async (id) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este item do estoque?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/stocks/${id}`);
      fetchStock();
      toast.success('Item de estoque removido com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover item do estoque.');
      console.error('Erro ao remover item do estoque:', error);
    }
  };

  const handleEditClick = (row) => {
    setEditableRowId(row.id);
    setSelectedProductId(row.productId);
    setQuantity(row.quantity);
    setSelectedStatus(row.status);
    setIsModalOpen(true);
  };

  const openModalForNewStock = () => {
    setEditableRowId(null);
    setSelectedProductId('');
    setQuantity('');
    setSelectedStatus('');
    setIsModalOpen(true);
  };

  const getProductById = (productId) => {
    const product = products.find(product => product.id === productId);
    return product ? product.name : 'Produto não encontrado';
  };

  return (
    <div className='p-6 max-w-6xl mx-auto space-y-4'>
      <Link to="/pageHome">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className='text-3xl font-bold'>Estoque</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={openModalForNewStock}>
          Adicionar ao Estoque
        </Button>
      </div>

      <div className='border rounded overflow-x-auto'>
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-4 py-2">Nome</TableHead>
              <TableHead className="text-center px-4 py-2">Quantidade</TableHead>
              <TableHead className="text-center px-4 py-2">Status</TableHead>
              <TableHead className="text-center px-4 py-2">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockRows.map((row, index) => (
              <TableRow key={row.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <TableCell className="text-center px-4 py-2">{getProductById(row.productId)}</TableCell>
                <TableCell className="text-center px-4 py-2">{row.quantity}</TableCell>
                <TableCell className="text-center px-4 py-2">{row.status}</TableCell>
                <TableCell className="text-center px-4 py-2">
                  <div className="flex justify-center space-x-4">
                    <button onClick={() => handleEditClick(row)}>
                      <Edit3 className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                    </button>
                    <button onClick={() => handleRemoveStockItem(row.id)}>
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
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
            <h2 className="text-xl font-bold mb-4">{editableRowId ? 'Editar Estoque' : 'Adicionar ao Estoque'}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="productId" className="block text-sm font-medium text-gray-700">Produto</label>
                <select
                  name="productId"
                  className="border rounded p-2 w-full"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  disabled={editableRowId !== null}
                >
                  <option value="">Selecione um produto</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantidade</label>
                <Input
                  type="number"
                  name="quantity"
                  placeholder="Quantidade"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  className="border rounded p-2 w-full"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Selecione o status</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddOrUpdateStock}>
                {editableRowId ? 'Salvar' : 'Adicionar'}
              </Button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductStock;
