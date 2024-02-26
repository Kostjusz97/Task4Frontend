import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://task4backend-0xr1.onrender.com'
});

export default instance;