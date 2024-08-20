import React, { useState, useEffect } from 'react';
import api from '@/api/api'; 
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { Edit, Trash2 } from 'lucide-react';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    expirationDate: '', 
    cost: '',
    type: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products'); 
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!newProduct.name) {
      errors.name = "Nome é obrigatório.";
    }
    if (!newProduct.description) {
      errors.description = "Descrição é obrigatória.";
    }
    if (!newProduct.category) {
      errors.category = "Categoria é obrigatória.";
    }
    if (!newProduct.expirationDate) {
      errors.expirationDate = "Data é obrigatória.";
    }
    if (!newProduct.cost || isNaN(newProduct.cost)) {
      errors.cost = "Preço é obrigatório e deve ser um número válido.";
    }
    if (!newProduct.type) {
      errors.type = "Tipo é obrigatório.";
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
      const productData = { ...newProduct };

      if (editMode) {
        await api.put(`/products/${newProduct.id}`, productData);
      } else {
        await api.post('/products', productData);
      }

      fetchProducts();
      setNewProduct({ id: '', name: '', description: '', category: '', expirationDate: '', cost: '', type: '' });
      setEditMode(false);
      setErrors({});
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding/editing product:', error);
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  };

  const openModalForNewProduct = () => {
    setNewProduct({ id: '', name: '', description: '', category: '', expirationDate: '', cost: '', type: '' });
    setEditMode(false);
    setIsModalOpen(true);
  };

  const openModalForEditProduct = (product) => {
    setNewProduct(product);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4 w-full'>
      <Link to="/">
        <IoIosArrowBack className="mr-2 text-lg cursor-pointer" />
      </Link>
      <h1 className='text-3xl font-bold'>Produtos</h1>
      <div className='flex justify-end w-full mb-4'>
        <Button onClick={openModalForNewProduct}>
          Adicionar produto
        </Button>
      </div>
      <div className='border rounded w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(products) && products.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{formatDate(row.expirationDate)}</TableCell>
                <TableCell>R$ {row.cost.toFixed(2)}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openModalForEditProduct(row)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveProduct(row.id)}
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
            <h2 className="text-xl font-bold mb-4">{editMode ? 'Editar Produto' : 'Adicionar Produto'}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                <Input
                  name="name"
                  placeholder='Nome do produto'
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className='text-red-500'>{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                <Input
                  name="description"
                  placeholder='Descrição'
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className='text-red-500'>{errors.description}</p>}
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
                <Input
                  name="category"
                  placeholder='Categoria'
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className={errors.category ? 'border-red-500' : ''}
                />
                {errors.category && <p className='text-red-500'>{errors.category}</p>}
              </div>
              <div>
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Validade</label>
                <Input
                  type="date"
                  name="expirationDate"
                  placeholder='Data'
                  value={newProduct.expirationDate}
                  onChange={handleInputChange}
                  className={errors.expirationDate ? 'border-red-500' : ''}
                />
                {errors.expirationDate && <p className='text-red-500'>{errors.expirationDate}</p>}
              </div>
              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Preço</label>
                <Input
                  name="cost"
                  placeholder='Preço'
                  value={newProduct.cost}
                  onChange={handleInputChange}
                  className={errors.cost ? 'border-red-500' : ''}
                />
                {errors.cost && <p className='text-red-500'>{errors.cost}</p>}
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo</label>
                <Input
                  name="type"
                  placeholder='Tipo'
                  value={newProduct.type}
                  onChange={handleInputChange}
                  className={errors.type ? 'border-red-500' : ''}
                />
                {errors.type && <p className='text-red-500'>{errors.type}</p>}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddOrEditProduct}>
                {editMode ? 'Salvar' : 'Adicionar'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
