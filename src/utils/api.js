import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-flower-shop.onrender.com/api', // Adjust this later when backend is ready
});

// You can attach tokens or other headers here if needed
// API.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default API;
