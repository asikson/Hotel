import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from '../styles/addReservationDialogStyles';
import { addReservation, addClient, getFreeRooms, addStayReservation } from '../../utils/api';
import { isEmpty } from '../../utils/apiUtils';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MenuItem } from '@mui/material';
import GenericSelect from './GenericSelect';
import StandardDropdown from './StandardDropdown';

const ReservationInput = (
    {
        setOpen, 
        item, 
        type, 
        refresh, 
        workerId,
        clients, 
        setAlgorithmDialogOpen 
    }
) => {

    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [numOfPeople, setNumOfPeople] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [standard, setStandard] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [newClient, setNewClient] = useState(false);
    const [clientId, setClientId] = useState(null);
    const [freeRooms, setFreeRooms] = useState([]);

    const stay = type === 'stay';

    useEffect(() => {
        if (item) {
            setDateFrom(item.from_date);
            setDateTo(item.to_date);
            setNumOfPeople(item.number_of_people);
            setClientId(item.id_client);
        }
    }, [item]);

    useEffect(() => {
        if (dateFrom && dateTo && standard != null && numOfPeople) {
            getFreeRooms(dateFrom, dateTo, standard, numOfPeople).then(response => {
                setFreeRooms(response.data);
            })
        }
    }, [dateFrom, dateTo, standard, numOfPeople]);

    const cleanUp = () => {
        setDateFrom('');
        setDateTo('');
        setNumOfPeople('');
        setClientId(null);
        refresh();
    };

    const handleAddReservation = async (newClientId) => {
        const reservationClient = newClientId ? newClientId : clientId;

        return addReservation(type, reservationClient, workerId, dateFrom, dateTo, numOfPeople).then(response => {
            addStayReservation(response.data.id_stay, roomId).then(_ => {
                cleanUp();
                setOpen(false);

                if (!stay) {
                    setAlgorithmDialogOpen(true);
                }
            })
        });
    }

    const handleAdd = () => { 
        if (newClient) {
            addClient(name, surname).then(response => {
                handleAddReservation(response.data.id_client);
            });
        } else {
            handleAddReservation();
        }
    };

    const createClientItem = (client) => {
        const label = `${client.name} ${client.surname}`;
        return <MenuItem value={client.id_client}>{label}</MenuItem>
    };

    const createRoomItem = (room) => <MenuItem value={room.id_room}>{room.name}</MenuItem>;

    const addDisabled = [dateFrom, dateTo, numOfPeople, standard, roomId].some(isEmpty)
        || newClient && (isEmpty(name) || isEmpty(surname)) || !newClient && isEmpty(clientId);

    return (
        <div style={styles.container}>
            <div style={styles.sideToSide}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div style={styles.dateInput}>
                        <DesktopDatePicker
                            label="Od"
                            inputFormat="DD/MM/YYYY"
                            value={dateFrom}
                            onChange={(value) => setDateFrom(value)}
                            renderInput={(params) => <TextField 
                                {...params} 
                                color='warning'
                            />}
                        />
                    </div>
                    <div style={styles.dateInput}>
                        <DesktopDatePicker
                            label="Do"
                            inputFormat="DD/MM/YYYY"
                            value={dateTo}
                            onChange={(value) => setDateTo(value)}
                            renderInput={(params) => <TextField
                                {...params}
                                color='warning'
                            />}
                        />
                    </div>
                </LocalizationProvider>
            </div>
            <TextField
                style={styles.input} 
                type={'number'} 
                label={'Liczba osób'} 
                color='warning' 
                value={numOfPeople}
                onChange={e => setNumOfPeople(e.target.value)}
            />
            {stay 
                ? <StandardDropdown
                    standard={standard}
                    setStandard={setStandard}
                />
                : null
            }
            
            <GenericSelect 
                styles={styles.input}
                items={freeRooms}
                itemId={roomId}
                setItemId={setRoomId}
                label={stay ? 'pokój' : 'salę'}
                createItem={createRoomItem}
            />
            
            <div style={styles.sideToSide}>
                {newClient
                    ? <div style={styles.newClientForm}>
                        <TextField
                            style={styles.input} 
                            type={'text'} 
                            label={'Imię'} 
                            color='warning' 
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <TextField
                            style={styles.input} 
                            type={'text'} 
                            label={'Nazwisko'} 
                            color='warning' 
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                        />
                    </div>
                    : <GenericSelect 
                        items={clients}
                        itemId={clientId} 
                        setItemId={setClientId} 
                        label='klienta'
                        createItem={createClientItem}
                    />
                }
                <div style={styles.newClientForm}>
                    <FormControlLabel 
                        style={styles.checkbox}
                        label='Nowy klient'
                        control={
                            <Checkbox
                                value={newClient}
                                onChange={e => setNewClient(e.target.checked)}
                                sx={{color: 'orange', '&.Mui-checked': {
                                    color: 'orange',
                                }}}
                            />
                        }
                    />
                </div>
            </div>
            
            <button style={styles.button} onClick={handleAdd} disabled={addDisabled}>Dodaj</button>
        </div>
    )
}

export default ReservationInput;