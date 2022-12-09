import axios from 'axios';

const localhost = 'http://127.0.0.1:'

export const idNames = {
    'rooms/rooms': 'id_room',
    'rooms/conferencerooms': 'id_conference_room',
    'users/workers': 'id_worker',
    'reservations/stayreservation': 'id_stay',
    'reservations/conferencereservation': 'id_conference'
}

const getPort = (key) => {
    switch(key) {
        case 'rooms/rooms':
        case 'rooms/conferencerooms':
            return 8001;

        case 'reservations/stayreservation':
        case 'reservations/conferencereservation':
        case 'reservations':
            return 8000;

        case 'users/workers':
        case 'users/clients':
            return 8002;

        default:
            return 0
    }
}


const reachEndpoint = (endpoint, port) => {
    return `${localhost}${port}/${endpoint}`;
};

export const getItems = async (endpoint) => {
    return axios.get(reachEndpoint(endpoint, getPort(endpoint)))
        .then(response => response.data);
};

export const addItem = async (endpoint, name, numOfPeople, standard=null) => {
    const payload = standard 
        ? { name, number_of_people: numOfPeople, standard}
        : { name, number_of_people: numOfPeople}
    return axios.post(`${reachEndpoint(endpoint, getPort(endpoint))}/create/`,
        payload
    );
};

export const updateItem = async (endpoint, id, name, numOfPeople, standard=null) => {
    const payload = standard 
        ? { [idNames[endpoint]]: id, name, number_of_people: numOfPeople, standard}
        : { [idNames[endpoint]]: id, name, number_of_people: numOfPeople}
    return axios.put(`${reachEndpoint(endpoint, getPort(endpoint))}/update/${id}/`,
        payload
    );
};

export const deleteItem = async (endpoint, id) => {
    return axios.delete(`${reachEndpoint(endpoint, getPort(endpoint))}/delete/${id}/`);
};
1
export const addUser = async (name, surname, priviliges) => {
    return axios.post(`${reachEndpoint('users/workers/create/', getPort('users/workers'))}`,
        { name: name, surname: surname, priviliges: priviliges}
    );
};

export const updateUser = async (id, name, surname, priviliges) => {
    return axios.put(`${reachEndpoint('users/workers/update/', getPort('users/workers'))}${id}/`,
        { [idNames['users/workers']]: id, name: name, surname: surname, priviliges: priviliges}
    );
};

export const addClient = async (name, surname) => {
    return axios.post(`${reachEndpoint('users/clients/create/', getPort('users/clients'))}`,
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
    return axios.post(`${reachEndpoint(`reservations/${type}reservation/create/`, getPort('reservations'))}`,
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
    return axios.put(`${reachEndpoint(`reservations/${type}reservation/update/`, getPort('reservations'))}${id}/`,
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
    return axios.delete(`${reachEndpoint(endpoint, getPort(endpoint))}/delete/${id}/`);
};

export const getClientById = async (id) => {
    return axios.get(`${reachEndpoint(`users/clients/?id_client=${id}`, getPort('users/clients'))}`);
};

export const getWorkerById = async (id) => {
    return axios.get(`${reachEndpoint(`users/workers/?id_worker=${id}`, getPort('users/clients'))}`);
};

export const getFreeRooms = async (dateFrom, dateTo) => {
    const from = convertToShortFormat(dateFrom);
    const to = convertToShortFormat(dateTo);
    return axios.get(`${reachEndpoint(`rooms/rooms/vacancies/${from}/${to}`, getPort('rooms/rooms'))}`);
}