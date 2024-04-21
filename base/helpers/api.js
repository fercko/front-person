import axios from 'axios';

const api = () => {
    const defaultOptions = {
        baseURL: `${process.env.url_back}/`,
    };

    /** Creamos instancia */
    let instance = axios.create(defaultOptions);

    return instance;
};

export default api();
