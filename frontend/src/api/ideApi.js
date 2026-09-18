import apiClient from './client.js';

// Expected Spring Boot / AI-gateway endpoint:
//   POST /api/ide/chat { activeFile, source, message } -> { reply }
export async function sendIdeChatMessage({ activeFile, source, message }) {
  const { data } = await apiClient.post('/ide/chat', { activeFile, source, message });
  return data;
}
