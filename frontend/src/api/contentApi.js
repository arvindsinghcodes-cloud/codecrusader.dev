import apiClient from './client.js';

// Content that will eventually be served from Spring Boot + a database
// instead of the local src/data/*.js fixtures:
//   GET /api/videos
//   GET /api/courses
//   GET /api/schedule
//   GET /api/campaigns
//   GET /api/notes
export const fetchVideos = () => apiClient.get('/videos').then((r) => r.data);
export const fetchCourses = () => apiClient.get('/courses').then((r) => r.data);
export const fetchSchedule = () => apiClient.get('/schedule').then((r) => r.data);
export const fetchCampaigns = () => apiClient.get('/campaigns').then((r) => r.data);
export const fetchNotes = () => apiClient.get('/notes').then((r) => r.data);
