import { transformDate } from "../../utils/apiUtils";

const dayMs = 86400000;

export const checkIfDateBetween = (date, fromDate, toDate) => {
    const dt = new Date(date);
    const from = new Date(fromDate);
    const to = new Date(toDate);

    return dt >= from && dt <= to;
};

export const transformData = (data, toggleKey) => {
    let result = {};
    const idName = toggleKey === 'stay' ? 'id_room' : 'id_conference_room';

    data.map(item => {
        const id = item[idName];
        if (id in Object.keys(result)) {
            result[id] = {...result[id], ...item.info};
        } else {
            result[id] = item.info;
        }
    })

    return result;
};

export const checkReservation = (reservation, column) => {
    const { from_date, to_date } = reservation;
    if (checkIfDateBetween(column, from_date, to_date)) {
        return true;
    }
    
    return false;
};

export const getDatesFromCurrentWeek = () => {
    const currentDate = new Date(Date.now());
    const first = currentDate.getTime() - (currentDate.getDay() - 1) % 7 * dayMs;

    const days = Array.from(Array(7), (_, index) => new Date(currentDate.setTime(first + index * 86400000)));
    return days.map(transformDate);
};

const weekDays = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'];

export const addWeekDays = (dates) => {
    return dates.map((date, index) => `${weekDays[index]}, ${date}`);
};

export const shiftDates = (days, shift) => {
    return days.map(d => {
        const day = new Date(d);
        const date = day.getDate();
        const dayWithShift = new Date(day.setDate(date + shift));
        return transformDate(dayWithShift);
    });
};

export const getNextWeek = (week) => {
    return shiftDates(week, 7);
};

export const getPreviousWeek = (week) => {
    return shiftDates(week, -7);
};