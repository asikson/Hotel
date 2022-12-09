const labels = {
    ['rooms/rooms']: {
        name: 'Nazwa',
        number_of_people: 'Liczba miejsc',
        standard: 'Standard'
    },
    ['rooms/conferencerooms']: {
        name: 'Nazwa',
        number_of_people: 'Liczba miejsc',
    },
    ['users/workers']: {
        name: 'Imię',
        surname: 'Nazwisko',
        priviliges: 'Uprawnienia'
    }
};

export const getLabels = (pageKey) => labels[pageKey];