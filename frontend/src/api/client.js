import axios from 'axios';

// All backend calls go through this instance. Point VITE_API_BASE_URL at the
// Spring Boot service (e.g. http://localhost:8080/api) once it exists — see
// frontend/README.md for the expected endpoint contract.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach a JWT/session token issued by the Spring Boot backend, once auth exists.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('cc_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
