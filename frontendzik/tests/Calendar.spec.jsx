import React from 'react';
import Calendar from '../src/Calendar/components/Calendar';
import { fireEvent, render, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';

const api = require('../src/utils/api');

const mockRoom = {
    id_room: 1, 
    name: 'Cool room',
    number_of_people: 5, 
    standard: 2
};

const mockReservation = {
    id_stay: 1,
    id_client: 1,
    id_worker: 1,
    reservation_date: '2022-10-29',
    from_date: '2022-12-26',
    to_date: '2022-12-28',
    number_of_people: 10,
    rooms: [mockRoom]
};

const mockClient = {
    id_client: 1,
    name: 'Asikson',
    surname: 'Em'
};

const mockWorker = {
    id_worker: 1,
    name: 'Best',
    surname: 'Worker'
};

const mockGetItems = jest.spyOn(api, 'getItems').mockImplementation(async (toggleKey) => {
    if (toggleKey === 'rooms/rooms') {
        return [mockRoom];
    }
    return [];
});

const mockGetCalendarData = jest.spyOn(api, 'getCalendarData').mockImplementation(async (toggleKey) => {
    if (toggleKey === 'stay') {
        return {data: [mockReservation]};
    }
    return {data: []}
});

jest.spyOn(api, 'getClientById').mockImplementation(async () => ({data: [mockClient]}));
jest.spyOn(api, 'getWorkerById').mockImplementation(async () => ({data: [mockWorker]}));
jest.spyOn(api, 'getRoomForStay').mockImplementation(async () => ({data: [mockRoom]}));
jest.spyOn(api, 'getRoomById').mockImplementation(async () => ({data: [mockRoom]}));


const mockDate = new Date('2022-12-27');
jest.spyOn(Date, 'now').mockImplementation(() => mockDate);

describe('Calendar', () => {

    it('Should correctly render dates and rooms', async () => {
        const { getByText } = render(
            <Calendar />
        );
        
        await waitFor (() => {
            expect(getByText('Tydzień od 2022-12-26 do 2023-01-01')).toBeInTheDocument();
            expect(getByText('Pon, 2022-12-26')).toBeInTheDocument();
            expect(getByText('Wt, 2022-12-27')).toBeInTheDocument();
            expect(getByText('Śr, 2022-12-28')).toBeInTheDocument();
            expect(getByText('Czw, 2022-12-29')).toBeInTheDocument();
            expect(getByText('Pt, 2022-12-30')).toBeInTheDocument();
            expect(getByText('Sob, 2022-12-31')).toBeInTheDocument();
            expect(getByText('Nd, 2023-01-01')).toBeInTheDocument();
            expect(getByText('Cool room')).toBeInTheDocument();
        });
    });

    it('Should correctly switch week on right arrow click', async () => {
        
        const { getByText } = await act( async () => render(<Calendar />));

        const arrowRight = getByText('>');
        fireEvent.click(arrowRight);

        await waitFor(() => {
            expect(getByText('Tydzień od 2023-01-02 do 2023-01-08')).toBeInTheDocument();
        });
    });

    it('Should correctly switch week on left arrow click', async () => {
        
        const { getByText } = await act( async () => render(<Calendar />));

        const arrowLeft = getByText('<');
        fireEvent.click(arrowLeft);

        await waitFor(() => {
            expect(getByText('Tydzień od 2022-12-19 do 2022-12-25')).toBeInTheDocument();
        });
    });

    it('Should show reservation details on block click', async () => {
        const { getByTestId, getByText } = await act( async () => render(<Calendar />));

        const reservationButton = getByTestId('Cool room-2022-12-26');
        fireEvent.click(reservationButton);

        await waitFor(() => {
            expect(getByText('Szczegóły rezerwacji')).toBeInTheDocument();
            expect(getByText('Asikson Em')).toBeInTheDocument();
            expect(getByText('Best Worker')).toBeInTheDocument();
            expect(getByText('Cool room')).toBeInTheDocument();
            expect(getByText('2022-12-26 -> 2022-12-28')).toBeInTheDocument();
        });
    });

    it('Should fetch data on toggle change', async () => {
        const { getByText } = await act( async () => render(<Calendar />));

        const conferenceButton = getByText('Sale konferencyjne');
        fireEvent.click(conferenceButton);

        await waitFor(() => {
            expect(mockGetCalendarData).toHaveBeenCalledWith('conference');
            expect(mockGetItems).toHaveBeenCalledWith('rooms/conferencerooms');
        });
    });
});