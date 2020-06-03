import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://localhost:8081',
});

export default api;
