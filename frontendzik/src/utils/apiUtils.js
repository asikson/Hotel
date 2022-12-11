import { idNames, labels, ports } from './constants';

const transformDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
};

export const getCurrentDate = () => {
    const date = new Date();
    return transformDate(date);
};

export const convertToShortFormat = (date) => {
    if (typeof(date) === 'string') {
        return date;
    }

    const newDate = new Date(date.toString())
    return transformDate(newDate);
};

export const getPrefix = (key) => {
    const slashIndex = key.indexOf('/');

    if (slashIndex === -1) {
        return key;
    }

    return key.slice(0, slashIndex);
};

export const getLabels = (pageKey) => labels[pageKey];

export const getPort = (key) => {
    return ports[getPrefix(key)];
};

export const getIdName = (table) => {
    return idNames[table];
};

export const getIdValue = (type, item) => {
    return item[getIdName(type)];
}