import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the authorization token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Define a type for the error response data
interface ErrorResponse {
  message: string;
}

// Error handler to catch non-JSON errors
function handleResponseError(error: AxiosError) {
  const response = error.response;
  if (response && response.data) {
    const errorData = response.data as ErrorResponse;
    throw new Error(errorData.message || 'API request failed');
  } else {
    throw new Error('API request failed with non-JSON response');
  }
}

// Register function
export async function register(email: string, password: string) {
  try {
    const response = await axiosInstance.post('/users/register', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    handleResponseError(error as AxiosError);
  }
}

// Login function
export async function login(email: string, password: string) {
  try {
    const response = await axiosInstance.post('/users/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    handleResponseError(error as AxiosError);
  }
}

// Verify OTP function
export async function verifyOTP(email: string, otp: string) {
  const response = await fetch(`${API_URL}/users/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otpCode: otp }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to verify OTP');
  }

  return response.json();
}

// Get files function
export async function getFiles() {
  try {
    const response = await axiosInstance.get('/files');
    return response.data;
  } catch (error) {
    handleResponseError(error as AxiosError);
  }
}

// Upload file function
export async function uploadFile(file: File, name: string) {
  const maxFileSize = 10 * 1024 * 1024; // 10MB limit

  if (file.size > maxFileSize) {
    throw new Error('File size exceeds the limit of 10MB');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);

  try {
    const response = await axiosInstance.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Axios will handle this
      },
    });
    return response.data;
  } catch (error) {
    handleResponseError(error as AxiosError);
  }
}

// Update file function
export async function updateFile(id: string, name: string) {
  try {
    const response = await axiosInstance.put(`/files/${id}`, { name });
    return response.data;
  } catch (error) {
    handleResponseError(error as AxiosError);
  }
}

// Delete file function
export async function deleteFile(id: string) {
  try {
    const response = await axiosInstance.delete(`/files/${id}`);
    return response.data;
  } catch (error) {
    handleResponseError(error as AxiosError);
  }
}
