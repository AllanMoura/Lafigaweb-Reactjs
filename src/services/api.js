import Axios from 'axios';
import { getToken } from './auth';

const api = Axios.create({baseURL: "https://lafiga-nts.herokuapp.com/api"});

api.interceptors.request.use(async config =>{
    const token = getToken(); 
    if(token){
        config.headers.token = token;
    }

    return config;
});

export default api;