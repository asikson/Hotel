import axios from 'axios';
import { getCurrentDate, convertToShortFormat, getPort, getIdName, getPrefix } from './apiUtils';

const localhost = 'http://0.0.0.0:'

const reachEndpoint = (endpoint) => {
    const prefix = getPrefix(endpoint);
    const port = getPort(prefix);

    return `${localhost}${port}/${endpoint}`;
};

const reachCreateEndpoint = (endpoint) => {
    return `${reachEndpoint(endpoint)}/create/`;
};

const reachUpdateEndpoint = (endpoint, id) => {
    return `${reachEndpoint(endpoint)}/update/${id}/`;
};

const reachDeleteEndpoint = (endpoint, id) => {
    return `${reachEndpoint(endpoint)}/delete/${id}/`;
}

export const getItems = async (endpoint) => {
    return axios.get(reachEndpoint(endpoint))
        .then(response => response.data);
};

export const addItem = async (endpoint, name, numOfPeople, standard=null, price=null, cost=null) => {
    const payload = standard != null
        ? { name, number_of_people: numOfPeople, standard, price, clean_price: cost}
        : { name, number_of_people: numOfPeople}

    return axios.post(reachCreateEndpoint(endpoint), payload);
};

export const updateItem = async (endpoint, id, name, numOfPeople, standard=null, price=null, cost=null) => {

    const payload = standard 
        ? { [getIdName(endpoint)]: id, name, number_of_people: numOfPeople, standard, price, clean_price: cost}
        : { [getIdName(endpoint)]: id, name, number_of_people: numOfPeople};

    return axios.put(reachUpdateEndpoint(endpoint, id), payload);
};

export const deleteItem = async (endpoint, id) => {
    return axios.delete(reachDeleteEndpoint(endpoint, id));
};

export const addUser = async (name, surname, priviliges) => {
    return axios.post(reachCreateEndpoint('users/workers'),
        { name: name, surname: surname, priviliges: priviliges}
    );
};

export const updateUser = async (id, name, surname, priviliges) => {
    return axios.put(reachUpdateEndpoint('users/workers', id),
        { [getIdName('users/workers')]: id, name: name, surname: surname, priviliges: priviliges}
    );
};

export const addClient = async (name, surname) => {
    return axios.post(reachCreateEndpoint('users/clients'),
        { name: name, surname: surname }
    );
};

export const addReservation = async (type, clientId, workerId, dateFrom, dateTo, numOfPeople) => {
    return axios.post(reachCreateEndpoint(`reservations/${type}reservation`),
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

export const getClientById = async (id) => {
    return axios.get(reachEndpoint(`users/clients/?id_client=${id}`));
};

export const getWorkerById = async (id) => {
    return axios.get(reachEndpoint(`users/workers/?id_worker=${id}`));
};

export const getFreeRooms = async (type, dateFrom, dateTo, numOfPeople, standard=null) => {
    const from = convertToShortFormat(dateFrom);
    const to = convertToShortFormat(dateTo);
 
    if (type === 'conference') {
        return axios.get(reachEndpoint(`rooms/conferencerooms/${from}/${to}/${numOfPeople}`));
    } else {
        return axios.get(reachEndpoint(`rooms/rooms/vacancies/${from}/${to}?standard=${standard}&number_of_people=${numOfPeople}`));
    }
};

export const addStayReservation = async (type, reservationId, roomId) => {
    const idStay = type === 'stay' ? 'id_stay' : 'id_conference';
    const id = type === 'stay' ? 'id_room' : 'id_conference_room';
    const payload = {
        [idStay]: reservationId,
        [id]: roomId
    };

    return axios.post(reachCreateEndpoint(`reservations/${type}roomreservation`), payload);
};

export const getRoomForStay = async (ifStay, reservationId) => {
    const id = ifStay ? 'id_stay' : 'id_conference';
    const type = ifStay ? 'stay' : 'conference';
    return axios.get(reachEndpoint(`reservations/${type}roomreservation/?${id}=${reservationId}`));
};

export const getRoomById = async (ifStay, roomId) => {
    const id = ifStay ? 'id_room' : 'id_conference_room';
    const type = ifStay ? '' : 'conference';
    return axios.get(reachEndpoint(`rooms/${type}rooms/?${id}=${roomId}`)); 
};

export const getAlgorithmData = async (dateFrom, dateTo, numOfPeople, standard=0) => {
    const from = convertToShortFormat(dateFrom);
    const to = convertToShortFormat(dateTo);

    return axios.get(reachEndpoint(`algorythm/${from}/${to}/${numOfPeople}`));
};

///${standard}