import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        'Authentication failed. Please check your network context.'
      );
    }
  },

  register: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/register', {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        'Registration failed. Try an alternate email address.'
      );
    }
  },
};

export const detectionService = {
  analyzeFile: async (file, type) => {
    try {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('modality_type', type);

      const response = await apiClient.post(
        '/analyze/file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        'Media verification task execution failure.'
      );
    }
  },

  analyzeText: async (text) => {
    try {
      const response = await apiClient.post('/analyze/text', {
        text,
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        'Text authentication pipeline extraction break.'
      );
    }
  },
    getHistory: async () => {
    try {
      const response = await apiClient.get("/analyze/history");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        "Unable to load analysis history."
      );
    }
  }
  
};