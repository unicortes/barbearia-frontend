// lib/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/barbeariaUnicortes/api', // URL base do seu back-end
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
