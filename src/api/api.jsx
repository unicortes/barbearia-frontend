import axios from 'axios';

const api = axios.create({
    baseURL: 'http://barbearia-kgd6.onrender.com/barbeariaUnicortes',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
