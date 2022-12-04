import axios from 'axios';

const localhost = 'http://127.0.0.1:8000/';

export const idNames = {
    'rooms/rooms': 'id_room',
    'rooms/conferencerooms': 'id_conference_room',
    'users/workers': 'id_worker',
    'reservations/stayreservation': 'id_stay',
    'reservations/conferencereservation': 'id_conference'
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
    return axios.post(`${reachEndpoint('users/workers/create/')}`,
        { name: name, surname: surname, priviliges: priviliges}
    );
};

export const updateUser = async (id, name, surname, priviliges) => {
    return axios.put(`${reachEndpoint('users/workers/update/')}${id}/`,
        { [idNames['users/workers']]: id, name: name, surname: surname, priviliges: priviliges}
    );
};

export const addClient = async (name, surname) => {
    return axios.post(`${reachEndpoint('users/clients/create/')}`,
        { name: name, surname: surname }
    );
};

const transformDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
};

const getCurrentDate = () => {
    const date = new Date();
    return transformDate(date);
};

const convertToShortFormat = (date) => {
    if (typeof(date) === 'string') {
        return date;
    }

    const newDate = new Date(date.toString())
    return transformDate(newDate);
};

export const addReservation = async (type, clientId, workerId, dateFrom, dateTo, numOfPeople) => {
    return axios.post(`${reachEndpoint(`reservations/${type}reservation/create/`)}`,
        { 
            id_client: clientId, 
            id_worker: workerId, 
            reservation_date: getCurrentDate(), 
            from_date: convertToShortFormat(dateFrom), 
            to_date: convertToShortFormat(dateTo), 
            number_of_people: numOfPeople 
        }
    );
};

export const updateReservation = async (type, id, clientId, workerId, dateFrom, dateTo, numOfPeople) => {
    return axios.put(`${reachEndpoint(`reservations/${type}reservation/update/`)}${id}/`,
        {
            [idNames[`reservations/${type}reservation`]]: id, 
            id_client: clientId, 
            id_worker: workerId, 
            reservation_date: getCurrentDate(), 
            from_date: convertToShortFormat(dateFrom), 
            to_date: convertToShortFormat(dateTo), 
            number_of_people: numOfPeople 
        }
    );
};

export const deleteStayReservation = async (endpoint, id) => {
    return axios.delete(`${reachEndpoint(endpoint)}/delete/${id}/`);
};
