// lib/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://barbearia-backend.onrender.com/barbeariaUnicortes/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
