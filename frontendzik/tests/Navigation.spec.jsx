import { fireEvent, render, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '../src/Home/components/Navigation';

const auth = require('../src/authorization/useAuth');
jest.spyOn(auth, 'useAuth').mockImplementation(() => ({token: 'token', onLogout: () => {}}));

const mockSetKey = jest.fn((key) => {});
const mockLogin = 'sample login';

describe('Navigation', () => {
    it('Should render all tabs and login', async () => {
        const { getByText } = render(
            <Navigation setKey={mockSetKey} login={mockLogin} pageKey='' admin={false}/>
        );

        await waitFor(() => {
            expect(getByText('Kalendarz')).toBeInTheDocument();
            expect(getByText('Rezerwacje')).toBeInTheDocument();
            expect(getByText('Pokoje')).toBeInTheDocument();
            expect(getByText('Sale konferencyjne'));
            expect(getByText('Wyloguj się')).toBeInTheDocument();
            expect(getByText('Witaj sample login!')).toBeInTheDocument();
        });
    });

    it('Should not render admin tab when no admin', async () => {
        const { queryByText } = render(
            <Navigation setKey={mockSetKey} login={mockLogin} pageKey='' admin={false}/>
        );

        await waitFor(() => {
            expect(queryByText('Panel administratora')).not.toBeInTheDocument();
        });
    });

    it('Should render admin tab when admin', async () => {
        const { getByText } = render(
            <Navigation setKey={mockSetKey} login={mockLogin} pageKey='' admin={true}/>
        );

        await waitFor(() => {
            expect(getByText('Panel administratora')).toBeInTheDocument();
        });
    });

    it('Should change page key on tab click', async () => {
        const { getByText } = await act( async () =>  render(
            <Navigation setKey={mockSetKey} login={mockLogin} pageKey='' admin={false}/>
        ));

        const roomsButton = getByText('Pokoje');
        fireEvent.click(roomsButton);

        await waitFor(() => {
            expect(mockSetKey).toHaveBeenCalledWith('rooms');
        })
    });
});