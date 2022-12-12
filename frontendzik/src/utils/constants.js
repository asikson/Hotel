const roomColumns = {
    name: 'Nazwa',
    number_of_people: 'Liczba miejsc',
    standard: 'Standard'
};

const conferenceRoomColumns = {
    name: 'Nazwa',
    number_of_people: 'Liczba miejsc',
};

const workerColumns = {
    name: 'Imię',
    surname: 'Nazwisko',
    priviliges: 'Administrator'
};

export const labels = {
    'rooms/rooms': roomColumns,
    'rooms/conferencerooms': conferenceRoomColumns,
    'users/workers': workerColumns
};

export const ports = {
    'reservations': 8001,
    'rooms': 8002,
    'users': 8003
};

export const idNames = {
    'rooms/rooms': 'id_room',
    'rooms/conferencerooms': 'id_conference_room',
    'users/workers': 'id_worker',
    'reservations/stayreservation': 'id_stay',
    'reservations/conferencereservation': 'id_conference'
};

export const reservationLabels = {
    'stay': {
        reservation_date: 'Data rezerwacji',
        from_date: 'Od',
        to_date: 'Do',
        number_of_people: 'Liczba osób',
        check_in: 'Zameldowanie',
        check_out: 'Wymeldowanie',
    },

    'conference': {
        reservation_date: 'Data rezerwacji',
        from_date: 'Od',
        to_date: 'Do',
        number_of_people: 'Liczba osób',
    }
};

export const roomStandards = [
    {id: 0, name: 'ekonomiczny'},
    {id: 1, name: 'klasyczny'},
    {id: 2, name: 'podwyższony'},
    {id: 3, name: 'premium'},
    {id: 4, name: 'deluxe'},
    {id: 5, name: 'królewski'}
];

export const getStandardName = (value) => {
    return roomStandards[value].name;
};

export const mapValue = (column, value) => {
    switch(column) {
        case 'standard':
            return getStandardName(value);
        default:
            return value;
    }
};