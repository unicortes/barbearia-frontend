import React, { useState, useEffect } from 'react';
import api from '@/api/api';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const statusOptions = ["EM_USO", "LACRADO"];

const ProductStock = () => {
  const [stockRows, setStockRows] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [editableRowId, setEditableRowId] = useState(null);

  useEffect(() => {
    fetchStock();
    fetchProducts();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await api.get('/stocks');
      setStockRows(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar o estoque:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleAddOrUpdateStock = async () => {
    if (!selectedProductId || !quantity || !selectedStatus) {
      console.error('Produto, quantidade e status são obrigatórios.');
      return;
    }

    try {
      if (editableRowId) {
        await api.put(`/stocks/${editableRowId}`, {
          productId: selectedProductId,
          quantity: parseInt(quantity, 10),
          status: selectedStatus
        });
        setEditableRowId(null);
      } else {
        await api.post('/stocks', {
          productId: selectedProductId,
          quantity: parseInt(quantity, 10),
          status: selectedStatus
        });
      }

      fetchStock();
      setSelectedProductId('');
      setQuantity('');
      setSelectedStatus('');
    } catch (error) {
      console.error('Erro ao adicionar/atualizar o estoque:', error);
    }
  };

  const handleRemoveStockItem = async (id) => {
    try {
      await api.delete(`/stocks/${id}`);
      fetchStock();
    } catch (error) {
      console.error('Erro ao remover item do estoque:', error);
    }
  };

  const handleEditClick = (row) => {
    setEditableRowId(row.id);
    setSelectedProductId(row.productId);
    setQuantity(row.quantity);
    setSelectedStatus(row.status);
  };

  const getProductById = (productId) => {
    const product = products.find(product => product.id === productId);
    return product ? product.name : 'Produto não encontrado';
  };

  const tableRows = stockRows.map(row => (
    <TableRow key={row.id}>
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
  ));

  return (
    <div className='p-6 max-w-6xl mx-auto space-y-4'>
      <Link to="/">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className='text-3xl font-bold'>Estoque</h1>

      <div className="flex items-center gap-2">
        <select
          className="border rounded p-2"
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
        <Input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <select
          className="border rounded p-2"
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
        <Button onClick={handleAddOrUpdateStock}>
          {editableRowId ? 'Salvar' : 'Cadastrar'}
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
            {tableRows}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductStock;