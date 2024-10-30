import axios from 'axios';

const API_URL = 'http://localhost:5000/api/comment'; 
// Retrieve token from localStorage
const getToken = () => localStorage.getItem('token');


const postId = `6721abe64a0fb5725c5d66e3`;


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


export const getComments = async () => {
    try {
        const response = await axios.get(`${API_URL}/${postId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error',error);
        throw error.response.data;
    }
};


export const createComment = async (postId, text) => {
    try {
        const response = await apiWithAuth.post(`/${postId}`, { text });
        return response.data;
    } catch (error) {
        console.error('Error',error);
        throw error.response.data;
    }
};


// export const getPostWithComments = async (postId) => {
//     try {
//         const response = await apiWithAuth.get(`/${postId}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching post with comments:', error);
//         throw error.response.data;
//     }
// };

export const deleteComment = async ( commentId) => {
    try {
        const response = await apiWithAuth.delete(`/${postId}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const upvoteComment = async (commentId) => {
    try {
        const response = await apiWithAuth.post(`/${commentId}/upvote`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Downvote a specific comment (requires auth)
export const downvoteComment = async (commentId) => {
    try {
        const response = await apiWithAuth.post(`/${commentId}/downvote`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
