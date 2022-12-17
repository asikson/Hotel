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