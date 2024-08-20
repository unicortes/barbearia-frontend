// lib/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/barbeariaUnicortes/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
