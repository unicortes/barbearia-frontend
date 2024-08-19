/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
// eslint-disable-next-line no-unused-vars
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// eslint-disable-next-line no-unused-vars
import { Edit, Trash2 } from 'lucide-react';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    date: '',
    price: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
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
    if (!newProduct.date) {
      errors.date = "Data é obrigatória.";
    }
    if (!newProduct.price) {
      errors.price = "Preço é obrigatório.";
    }
    return errors;
  };

  const handleAddProduct = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      if (editMode) {
        await axios.put(`/api/products/${newProduct.id}`, newProduct);
      } else {
        await axios.post('/api/products', { ...newProduct, date: new Date().toLocaleDateString() });
      }
      fetchProducts();
      setNewProduct({ id: '', name: '', description: '', category: '', date: '', price: '' });
      setEditMode(false);
      setErrors({});
    } catch (error) {
      console.error('Error adding/editing product:', error);
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditMode(true);
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4 w-full'>
      <h1 className='text-3xl font-bold'>{editMode ? 'Editar produto' : 'Produtos'}</h1>
      <div className='flex items-center justify-between w-full'>
        <form className='flex items-center gap-2 w-full' onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
          <Input
            name="name"
            placeholder='Nome do produto'
            value={newProduct.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className='text-red-500'>{errors.name}</p>}
          <Input
            name="description"
            placeholder='Descrição'
            value={newProduct.description}
            onChange={handleInputChange}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && <p className='text-red-500'>{errors.description}</p>}
          <Input
            name="category"
            placeholder='Categoria'
            value={newProduct.category}
            onChange={handleInputChange}
            className={errors.category ? 'border-red-500' : ''}
          />
          {errors.category && <p className='text-red-500'>{errors.category}</p>}
          <Input
            name="date"
            placeholder='Data'
            value={newProduct.date}
            onChange={handleInputChange}
            className={errors.date ? 'border-red-500' : ''}
          />
          {errors.date && <p className='text-red-500'>{errors.date}</p>}
          <Input
            name="price"
            placeholder='Preço'
            value={newProduct.price}
            onChange={handleInputChange}
          />
          {errors.price && <p className='text-red-500'>{errors.price}</p>}
          <Button type="submit">
            {editMode ? 'Salvar Alterações' : 'Adicionar produto'}
          </Button>
        </form>
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
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditProduct(row)}
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
    </div>
  );
};

export default Product;