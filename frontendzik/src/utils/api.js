import axios from 'axios';

const localhost = 'http://127.0.0.1:8000/';

const reachEndpoint = (endpoint) => {
    return localhost + endpoint;
};

export const getItems = async (endpoint) => {
    return axios.get(reachEndpoint(endpoint))
        .then(response => response.data);
};