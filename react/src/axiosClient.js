import { axios } from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

/*
@ interceptors are functions fired 
*** BEFORE the request is made 
** OR 
*** AFTER the response is received
*/

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const {response} = error;
        if(response.status === 401){ //user unauthorized
            localStorage.removeItem('ACCESS_TOKEN')
        }

        throw error;
    }
);

export default axiosClient;
