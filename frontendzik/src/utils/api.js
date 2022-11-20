import axios from 'axios';

const localhost = 'http://127.0.0.1:8000/';

export const idNames = {
    'rooms/rooms': 'id_room',
    'rooms/conferencerooms': 'id_conference_room'
}

const reachEndpoint = (endpoint) => {
    return `${localhost}${endpoint}`;
};

export const getItems = async (endpoint) => {
    return axios.get(reachEndpoint(endpoint))
        .then(response => response.data);
};

export const addItem = async (endpoint, id, name, numOfPeople) => {
    return axios.post(`${reachEndpoint(endpoint)}/create/`,
        {[idNames[endpoint]]: id, name: name, number_of_people: numOfPeople}
    );
};
export const updateItem = async (endpoint, id, name, numOfPeople) => {
    return axios.put(`${reachEndpoint(endpoint)}/update/${id}/`,
        {[idNames[endpoint]]: id, name: name, number_of_people: numOfPeople}
    );
}