import { fireEvent, render, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import GenericList from '../src/generic/components/GenericList';

const api = require('../src/utils/api');

const mockRoom1 = {
    id_room: 1, 
    name: 'Cool room',
    number_of_people: 5, 
    standard: 2,
    price: 110,
    clean_price: 10
};

const mockRoom2 = {
    id_room: 2, 
    name: 'Even cooler room',
    number_of_people: 10, 
    standard: 2,
    price: 120,
    clean_price: 20
};

const mockConferenceRoom1 = {
    id_conference_room: 1, 
    name: 'Super conference room',
    number_of_people: 100, 
};

const mockConferenceRoom2 = {
    id_conference_room: 1, 
    name: 'Extra conference room',
    number_of_people: 200, 
};


jest.spyOn(api, 'getItems').mockImplementation(async (endpoint) => {
    switch (endpoint) {
        case  'rooms/rooms':
            return [mockRoom1, mockRoom2];
        case 'rooms/conferencerooms':
            return [mockConferenceRoom1, mockConferenceRoom2];
        default:
            return [];
    }
});

const mockGoBack = jest.fn(() => {});

describe('GenericList', () => {
    it('Should correctly render items and column labels for rooms', async () => {
        const { getByText } = render(
            <GenericList pageKey='rooms/rooms' admin={false} />
        );

        await waitFor(() => {
            expect(getByText('Nazwa')).toBeInTheDocument();
            expect(getByText('Liczba miejsc')).toBeInTheDocument();
            expect(getByText('Standard')).toBeInTheDocument();
            expect(getByText('Cool room')).toBeInTheDocument();
            expect(getByText('Even cooler room')).toBeInTheDocument();
        });
    });

    it('Should correctly render items and column labels for conference rooms', async () => {
        const { getByText, getAllByText } = render(
            <GenericList pageKey='rooms/conferencerooms' admin={false} />
        );

        await waitFor(() => {
            expect(getByText('Nazwa')).toBeInTheDocument();
            expect(getByText('Liczba miejsc')).toBeInTheDocument();
            expect(getByText('Super conference room')).toBeInTheDocument();
            expect(getByText('Extra conference room')).toBeInTheDocument();
            expect(getAllByText('Szczegóły').length).toEqual(2);
        });
    });

    it('Should render admin buttons and fields for room admin view', async () => {
        const { getByText, getAllByText } = render(
            <GenericList pageKey='rooms/rooms' admin={true} />
        );

        await waitFor(() => {
            expect(getAllByText('Szczegóły').length).toEqual(2);
            expect(getAllByText('Edytuj').length).toEqual(2);
            expect(getAllByText('Usuń').length).toEqual(2);
            expect(getByText('Dodaj')).toBeInTheDocument();
            expect(getByText('Cena (PLN)')).toBeInTheDocument();
            expect(getByText('Koszt przygotowania (PLN)')).toBeInTheDocument();
        });
    });

    it('Should go back on go back click button', async () => {
        const { getByText } = await act( async () =>  render(
            <GenericList pageKey='rooms/rooms' admin={true} goBack={mockGoBack}/>
        ));

        const goBackButton = getByText('Wróć');
        fireEvent.click(goBackButton);

        await waitFor(() => {
            expect(mockGoBack).toHaveBeenCalled();
        });
    })
});