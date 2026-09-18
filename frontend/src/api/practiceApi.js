import apiClient from './client.js';

// Expected Spring Boot endpoints:
//   GET  /api/practice/problems               -> Problem[]
//   POST /api/practice/run { problemId, language, source } -> RunResult
export async function fetchProblems() {
  const { data } = await apiClient.get('/practice/problems');
  return data;
}

export async function runCode({ problemId, language, source }) {
  const { data } = await apiClient.post('/practice/run', { problemId, language, source });
  return data;
}
