import axios from 'axios';

const api = axios.create({
  baseURL: 'https://barbeariaUnicortes.com/api' // Substitua pelo URL base da sua API
});

export default api;
