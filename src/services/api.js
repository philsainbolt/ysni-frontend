import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (username, email, password) =>
    api.post('/api/auth/register', { username, email, password }),
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  profile: () => api.get('/api/users/profile'),
};

export const progressAPI = {
  get: () => api.get('/api/progress'),
  beat: (id) => api.post(`/api/progress/beat/${id}`),
};

export const challengeAPI = {
  getAll: () => api.get('/api/challenges'),
  getById: (id) => api.get(`/api/challenges/${id}`),
  submit: (id, userPrompt) =>
    api.post(`/api/challenges/${id}/submit`, {
      userPrompt,
      prompt: userPrompt,
    }),
};
