import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Pointing to our Node backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;