const labels = {
    ['rooms/rooms']: {
        name: 'Nazwa',
        number_of_people: 'Liczba miejsc',
    },
    ['rooms/conferencerooms']: {
        name: 'Nazwa',
        number_of_people: 'Liczba miejsc',
    },
};

export const getLabels = (pageKey) => labels[pageKey];