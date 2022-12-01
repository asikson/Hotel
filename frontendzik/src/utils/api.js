import axios from 'axios';

const localhost = 'http://127.0.0.1:8000/';

export const idNames = {
    'rooms/rooms': 'id_room',
    'rooms/conferencerooms': 'id_conference_room',
    'users/workers': 'id_worker'
}

const reachEndpoint = (endpoint) => {
    return `${localhost}${endpoint}`;

};

export const getItems = async (endpoint) => {
    return axios.get(reachEndpoint(endpoint))
        .then(response => response.data);
};

export const addItem = async (endpoint, name, numOfPeople) => {
    return axios.post(`${reachEndpoint(endpoint)}/create/`,
        { name: name, number_of_people: numOfPeople}
    );
};

export const updateItem = async (endpoint, id, name, numOfPeople) => {
    return axios.put(`${reachEndpoint(endpoint)}/update/${id}/`,
        {[idNames[endpoint]]: id, name: name, number_of_people: numOfPeople}
    );
};

export const deleteItem = async (endpoint, id) => {
    return axios.delete(`${reachEndpoint(endpoint)}/delete/${id}/`);
};
1
export const addUser = async (name, surname, priviliges) => {
    return axios.post(`${reachEndpoint('users/workers')}/create/`,
        { name: name, surname: surname, priviliges: priviliges}
    );
};

export const updateUser = async (id, name, surname, priviliges) => {
    return axios.put(`${reachEndpoint('users/workers')}/update/${id}/`,
        { [idNames[endpoint]]: id, name: name, surname: surname, priviliges: priviliges}
    );
};
