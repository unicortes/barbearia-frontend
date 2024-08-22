import axios from 'axios';

const api = axios.create({
    baseURL: 'https://barbearia-kgd6.onrender.com/barbeariaUnicortes/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;