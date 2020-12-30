import axios from 'axios';

const ROOT_URL = 'https://api.airtable.com/v0/apppa13MHUBR0nuxP';
const API_KEY = 'keytD9pwBZ4Dqx4l0';

const axiosInstance = axios.create({
  baseURL: ROOT_URL,
  timeout: 5000,
  headers: { Authorization: `Bearer ${API_KEY}` },
});

export default axiosInstance;
