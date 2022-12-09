import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from '../styles/addReservationDialogStyles';
import { idNames, addReservation, updateReservation, addClient } from '../../utils/api';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MenuItem } from '@mui/material';
import GenericSelect from './GenericSelect';

const ReservationInput = ({ setOpen, item, type, refresh, workerId, clients }) => {

    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [numOfPeople, setNumOfPeople] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [roomId, setRoomId] = useState(null);
    const [newClient, setNewClient] = useState(false);
    const [clientId, setClientId] = useState(null);
    const [freeRooms, setFreeRooms] = useState([]);

    useEffect(() => {
        if (item) {
            setDateFrom(item.from_date);
            setDateTo(item.to_date);
            setNumOfPeople(item.number_of_people);
            setClientId(item.id_client);
        }
    }, [item]);

    useEffect(() => {
        if (dateFrom && dateTo) {

        }
    }, [dateFrom, dateTo]);

    const cleanUp = () => {
        setDateFrom('');
        setDateTo('');
        setNumOfPeople('');
        setClientId(null);
        refresh();
    };

    const handleAddReservation = async (newClientId) => {
        const reservationClient = newClientId ? newClientId : clientId;

        return addReservation(type, reservationClient, workerId, dateFrom, dateTo, numOfPeople).then(_ => {
            cleanUp();
            setOpen(false);
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

    const handleUpdate = () => { 
        updateReservation(type, item[idNames[`reservations/${type}reservation`]], clientId, workerId, dateFrom, dateTo, numOfPeople).then(_ => {
            cleanUp();
            setOpen(false);
        });
    };

    const createClientItem = (client) => {
        const label = `${client.name} ${client.surname}`;
        return <MenuItem value={client.id_client}>{label}</MenuItem>
    };

    const createRoomItem = (room) => <MenuItem value={room.id_room}>{room.name}</MenuItem>;

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
            <GenericSelect 
                items={freeRooms}
                itemId={roomId}
                setItemId={setRoomId}
                label='pokój'
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
            
            {item
                ? <button style={styles.button} onClick={handleUpdate}>Zapisz</button>
                : <button style={styles.button} onClick={handleAdd}>Dodaj</button>
            }
        </div>
    )
}

export default ReservationInput;