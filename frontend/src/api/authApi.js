import apiClient from './client.js';

// Expected Spring Boot endpoints:
//   POST /api/auth/login   { email, password } -> { token, user }
//   POST /api/auth/signup  { name, email, password } -> { token, user }
export async function login(email, password) {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return data;
}

export async function signup(name, email, password) {
  const { data } = await apiClient.post('/auth/signup', { name, email, password });
  return data;
}
