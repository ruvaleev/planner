import axios from 'axios';

const ROOT_URL = process.env.ROOT_URL || 'http://localhost:4567';
const API_KEY = process.env.API_KEY || 'dev_api_key';

const axiosBackendInstance = axios.create({
  baseURL: ROOT_URL,
  timeout: 10_000,
  headers: { Authorization: `Bearer ${API_KEY}` },
  withCredentials: true,

});

export default axiosBackendInstance;
