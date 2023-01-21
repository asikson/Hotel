import React from 'react';
import AdminPanel from "../src/AdminPanel/components/AdminPanel";
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const api = require('../src/utils/api');

const getItemsMock = jest.spyOn(api, 'getItems').mockImplementation(async () => []);

describe('AdminPanel', () => {
    it('Should correctly render component', () => {
        const { getByText } = render(
            <AdminPanel />
        );

        expect(getByText('Zarządzaj pokojami')).toBeInTheDocument();
        expect(getByText('Zarządzaj salami')).toBeInTheDocument();
        expect(getByText('Zarządzaj kontami')).toBeInTheDocument();
    });

    it('Should change page content on button click', async () => {

        const { getByText, queryByText } = render(
            <AdminPanel />
        );
        
        const roomButton = getByText('Zarządzaj pokojami');
        fireEvent.click(roomButton);

        await waitFor(() => {
            expect(queryByText('Zarządzaj pokojami')).not.toBeInTheDocument();
            expect(queryByText('Zarządzaj salami')).not.toBeInTheDocument();
            expect(queryByText('Zarządzaj kontami')).not.toBeInTheDocument();
            expect(getItemsMock).toHaveBeenCalledTimes(1);
        });
    })
})