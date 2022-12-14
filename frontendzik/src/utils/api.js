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

export const getFreeRooms = async (dateFrom, dateTo, standard, numOfPeople) => {
    const from = convertToShortFormat(dateFrom);
    const to = convertToShortFormat(dateTo);
    return axios.get(reachEndpoint(`rooms/rooms/vacancies/${from}/${to}?standard=${standard}&number_of_people=${numOfPeople}`));
};

export const addStayReservation = async (reservationId, roomId) => {
    const payload ={
        id_stay: reservationId,
        id_room: roomId
    }
    return axios.post(reachCreateEndpoint('reservations/stayroomreservation'), payload);
};

export const getRoomForStay = async (reservationId) => {
    return axios.get(reachEndpoint(`reservations/stayroomreservation/?id_stay=${reservationId}`));
};

export const getRoomById = async (roomId) => {
    return axios.get(reachEndpoint(`rooms/rooms/?id_room=${roomId}`)); 
};