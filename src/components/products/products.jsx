import React, { useState, useEffect } from 'react';
import api from '@/api/api'; 
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2 } from 'lucide-react';

const Product = () => {
  // Armazena a lista de produtos
  const [products, setProducts] = useState([]);
  // Armazenar os dados do produto sendo adicionado ou editado
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    expirationDate: '', 
    cost: '',
    type: ''
  });
  // Controla se o formulário está em modo de edição ou cadastro
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  // Função que busca produtos da API
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products'); 
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Função que lida com mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  // Função que valida os campos do formulário
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

  // Função que cadastra ou edita um produto
  const handleAddProduct = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const productData = { ...newProduct };

      if (editMode) { // Avalia se está no modo de edição
        await api.put(`/products/${newProduct.id}`, productData); // Edita o produto
      } else {
        await api.post('/products', productData); // Cadastra um novo produto
      }

      fetchProducts(); // Atualiza a lista de produtos
      setNewProduct({ id: '', name: '', description: '', category: '', expirationDate: '', cost: '', type: '' }); 
      setEditMode(false); // Sai do modo de edição
      setErrors({}); 
    } catch (error) {
      console.error('Error adding/editing product:', error);
    }
  };

  // Função que remove um produto
  const handleRemoveProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`); 
      fetchProducts(); 
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  };

  // Função que preenche o formulário com os dados do produto a ser editado
  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditMode(true);
  };

  // Função que formata a data para exibição mais apresentável no grid de listagem
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
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
            type="date"
            name="expirationDate"
            placeholder='Data'
            value={newProduct.expirationDate}
            onChange={handleInputChange}
            className={errors.expirationDate ? 'border-red-500' : ''}
          />
          {errors.expirationDate && <p className='text-red-500'>{errors.expirationDate}</p>}
          <Input
            name="cost"
            placeholder='Preço'
            value={newProduct.cost}
            onChange={handleInputChange}
            className={errors.cost ? 'border-red-500' : ''}
          />
          {errors.cost && <p className='text-red-500'>{errors.cost}</p>}
          <Input
            name="type"
            placeholder='Tipo'
            value={newProduct.type}
            onChange={handleInputChange}
            className={errors.type ? 'border-red-500' : ''}
          />
          {errors.type && <p className='text-red-500'>{errors.type}</p>}
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
