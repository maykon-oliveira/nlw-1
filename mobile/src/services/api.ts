import Axios from 'axios';

export const BASE_URL = 'http://192.168.1.6:8081';

const api = Axios.create({
    baseURL: BASE_URL,
});

export default api;
