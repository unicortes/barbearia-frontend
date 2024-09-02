import axios from 'axios';

const api = axios.create({
    baseURL: 'https://barbearia-kgd6.onrender.com/barbeariaUnicortes',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
