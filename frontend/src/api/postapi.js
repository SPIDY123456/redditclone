import axios from 'axios';

const API_URL = 'http://localhost:5000/api/post'; // Adjust baseURL to /posts if needed

// Retrieve token from localStorage
const getToken = () => localStorage.getItem('token');

// Axios instance with token-based Authorization for requests that require it
const apiWithAuth = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiWithAuth.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add token if available
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Fetch all posts (no auth)
export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        console.log(response);
        return response.data || [] ;
       
    } catch (error) {
        console.error(`Error`,error);
        throw error.response.data;
    }
};


export const createPost = async (title, body) => {
    try {
        const response = await apiWithAuth.post(`${API_URL}/`, { title, body });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const upvotePost = async (postId) => {
    try {
        const response = await apiWithAuth.put(`/${postId}/upvote`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const downvotePost = async (postId) => {
    try {
        const response = await apiWithAuth.put(`/${postId}/downvote`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
