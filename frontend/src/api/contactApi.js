import apiClient from './client.js';

// Expected Spring Boot endpoint:
//   POST /api/contact  { name, email, projectType, message } -> { received: true }
export async function sendContactMessage(payload) {
  const { data } = await apiClient.post('/contact', payload);
  return data;
}
