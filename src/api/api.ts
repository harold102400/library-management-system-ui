import axios from 'axios';
import { API_URL } from '../config/config';


const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
