export const checkIfDateBetween = (date, fromDate, toDate) => {
    const dt = new Date(date);
    const from = new Date(fromDate);
    const to = new Date(toDate);

    return dt >= from && dt <= to;
};

export const transformData = (data) => {
    let result = {};

    data.map(reservation => {
        const dateFrom = reservation.from_date;
        const dateTo = reservation.to_date;
        const clientId = reservation.id_client;

        reservation.rooms.map(room => {
            const id = room.id_room;
            const payload = {
                dateFrom,
                dateTo,
                clientId
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
    const { dateFrom, dateTo } = reservation;
    if (checkIfDateBetween(column, dateFrom, dateTo)) {
        return true;
    }
    
    return false;
};