import { transformDate } from "../../utils/apiUtils";

export const checkIfDateBetween = (date, fromDate, toDate) => {
    const dt = new Date(date);
    const from = new Date(fromDate);
    const to = new Date(toDate);

    return dt >= from && dt <= to;
};

export const transformData = (data, toggleKey) => {
    let result = {};
    const stay = toggleKey === 'stay'

    data.map(reservation => {
        const idName = stay ? 'id_stay': 'id_conference';
        const idRoom = stay ? 'id_room' : 'id_conference_room';

        const { from_date, to_date, id_client, id_worker} = reservation;
        const reservationId = reservation[idName];

        reservation.rooms.map(room => {
            const id = room[idRoom];
            const payload = {
                from_date,
                to_date,
                id_client,
                id_worker,
                [idName]: reservationId
            };

            if (id in result) {
                result[id].push(payload);
            } else {
                result[id] = [payload];
            }
        })
    });

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
    const currentDate = new Date;
    const first = currentDate.getDate() - currentDate.getDay() - 6;
    
    const days = Array.from(Array(7), (_, index) => new Date(currentDate.setDate(first + index)));
    
    return days.map(transformDate);
};

const weekDays = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'];

export const addWeekDays = (dates) => {
    return dates.map((date, index) => `${weekDays[index]}, ${date}`);
};

const shiftDates = (days, shift) => {
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