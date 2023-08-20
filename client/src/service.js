import axios from 'axios';


const service = axios.create({
    baseURL: process.env.REACT_APP_SERVER_DOMAIN
});


service.interceptors.request.use((request) => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
    }
    return request;
});


export default service;
