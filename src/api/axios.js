// Import Axios library
import axios from "axios";
import.meta.env

// Create a new instance of Axios
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

console.log(import.meta.env.VITE_BASE_URL)

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use(
  (config) => {
    // Retrieve the token from your preferred method (e.g., localStorage)
    const token = localStorage.getItem('auction-token');

    // If a token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh or other actions
instance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response.status === 401) {
      // If the response status is 401 (Unauthorized), you can implement token refresh logic here
      // For simplicity, let's assume there is a refresh token function
      return refreshToken().then((newToken) => {
        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return instance(error.config);
      });
    }

    return Promise.reject(error);
  }
);

// Example function for refreshing the token (replace with your actual implementation)
function refreshToken() {
  // Implement your token refresh logic here
  // You may make a request to the server to get a new token
  // For example purposes, just return a hardcoded new token
  return Promise.resolve('newToken123');
}

export default instance;