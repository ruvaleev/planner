import axios from 'axios';

const ROOT_URL = 'http://localhost:4567';
const API_KEY = '2c9e41446469232014f7f013d3b7cf01cf661c536f76c232b6bf2d6ea519a7e37526cf1b9fa7be6460a07031055e446b0b1ce34ad4eee7e7689450fa3f356a80';

const axiosBackendInstance = axios.create({
  baseURL: ROOT_URL,
  timeout: 10_000,
  headers: { Authorization: `Bearer ${API_KEY}` },
});

export default axiosBackendInstance;
