import React, { useState, useEffect } from 'react';
import api from '@/api/api'; 
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { Edit, Trash2 } from 'lucide-react';

const Sale = () => {
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({
    saleId: '',
    saleName: '',
    saleDescription: '',
    salePromoCode: '',
    saleDiscount: '',
    saleExpirationDate: '',
    saleCategory: '',
    saleAvailability: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await api.get('/sales'); 
      setSales(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSale((prevSale) => ({
      ...prevSale,
      [name]: value
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!newSale.saleName) {
      errors.saleName = "Nome da venda é obrigatório.";
    }
    if (!newSale.saleDescription) {
      errors.saleDescription = "Descrição da venda é obrigatória.";
    }
    if (!newSale.salePromoCode) {
      errors.salePromoCode = "Código promocional é obrigatório.";
    }
    if (!newSale.saleDiscount || isNaN(newSale.saleDiscount)) {
      errors.saleDiscount = "Desconto é obrigatório e deve ser um número válido.";
    }
    if (!newSale.saleExpirationDate) {
      errors.saleExpirationDate = "Data de expiração é obrigatória.";
    }
    if (!newSale.saleCategory) {
      errors.saleCategory = "Categoria é obrigatória.";
    }
    if (!newSale.saleAvailability) {
      errors.saleAvailability = "Disponibilidade é obrigatória.";
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
        await api.put(`/sales/${newSale.saleId}`, saleData); 
      } else {
        await api.post('/sales', saleData); 
      }

      fetchSales(); 
      setNewSale({ saleId: '', saleName: '', saleDescription: '', salePromoCode: '', saleDiscount: '', saleExpirationDate: '', saleCategory: '', saleAvailability: '' }); 
      setEditMode(false); 
      setErrors({}); 
    } catch (error) {
      console.error('Error adding/editing sale:', error);
    }
  };

  
  const handleRemoveSale = async (id) => {
    try {
      await api.delete(`/sales/${id}`); 
      fetchSales(); 
    } catch (error) {
      console.error('Erro ao remover venda:', error);
    }
  };

  
  const handleEditSale = (sale) => {
    setNewSale(sale);
    setEditMode(true);
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
      <h1 className='text-3xl font-bold'>{editMode ? 'Editar promoção' : 'Promoções'}</h1>
      <div className='flex items-center justify-between w-full'>
        <form className='flex items-center gap-2 w-full' onSubmit={(e) => { e.preventDefault(); handleAddSale(); }}>
          <Input
            name="saleName"
            placeholder='Nome da venda'
            value={newSale.saleName}
            onChange={handleInputChange}
          />
          {errors.saleName && <p className='text-red-500'>{errors.saleName}</p>}
          <Input
            name="saleDescription"
            placeholder='Descrição'
            value={newSale.saleDescription}
            onChange={handleInputChange}
            className={errors.saleDescription ? 'border-red-500' : ''}
          />
          {errors.saleDescription && <p className='text-red-500'>{errors.saleDescription}</p>}
          <Input
            name="salePromoCode"
            placeholder='Código promocional'
            value={newSale.salePromoCode}
            onChange={handleInputChange}
            className={errors.salePromoCode ? 'border-red-500' : ''}
          />
          {errors.salePromoCode && <p className='text-red-500'>{errors.salePromoCode}</p>}
          <Input
            name="saleDiscount"
            placeholder='Desconto'
            value={newSale.saleDiscount}
            onChange={handleInputChange}
            className={errors.saleDiscount ? 'border-red-500' : ''}
          />
          {errors.saleDiscount && <p className='text-red-500'>{errors.saleDiscount}</p>}
          <Input
            type="date"
            name="saleExpirationDate"
            placeholder='Data de expiração'
            value={newSale.saleExpirationDate}
            onChange={handleInputChange}
            className={errors.saleExpirationDate ? 'border-red-500' : ''}
          />
          {errors.saleExpirationDate && <p className='text-red-500'>{errors.saleExpirationDate}</p>}
          <Input
            name="saleCategory"
            placeholder='Categoria'
            value={newSale.saleCategory}
            onChange={handleInputChange}
            className={errors.saleCategory ? 'border-red-500' : ''}
          />
          {errors.saleCategory && <p className='text-red-500'>{errors.saleCategory}</p>}
          <Input
            name="saleAvailability"
            placeholder='Disponibilidade'
            value={newSale.saleAvailability}
            onChange={handleInputChange}
            className={errors.saleAvailability ? 'border-red-500' : ''}
          />
          {errors.saleAvailability && <p className='text-red-500'>{errors.saleAvailability}</p>}
          <Button type="submit">
            {editMode ? 'Salvar Alterações' : 'Adicionar venda'}
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
              <TableHead>Código Promocional</TableHead>
              <TableHead>Desconto</TableHead>
              <TableHead>Data de Expiração</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Disponibilidade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(sales) && sales.map((row) => (
              <TableRow key={row.saleId}>
                <TableCell>{row.saleId}</TableCell>
                <TableCell>{row.saleName}</TableCell>
                <TableCell>{row.saleDescription}</TableCell>
                <TableCell>{row.salePromoCode}</TableCell>
                <TableCell>{row.saleDiscount}%</TableCell>
                <TableCell>{formatDate(row.saleExpirationDate)}</TableCell>
                <TableCell>{row.saleCategory}</TableCell>
                <TableCell>{row.saleAvailability}</TableCell>
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
                      onClick={() => handleRemoveSale(row.saleId)}
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