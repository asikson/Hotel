import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from '../styles/addReservationDialogStyles';
import { addReservation, addClient, getFreeRooms, addStayReservation, getAlgorithmData } from '../../utils/api';
import { isEmpty } from '../../utils/apiUtils';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MenuItem } from '@mui/material';
import GenericSelect from './GenericSelect';
import StandardDropdown from './StandardDropdown';
import commonDialogStyles from '../styles/commonDialogStyles';

const ReservationInput = (
    {
        setOpen, 
        item, 
        type, 
        refresh, 
        workerId,
        clients,
        setAlgorithmDialogOpen,
        handleOpenAlgorithmDialog
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
        if (stay && dateFrom && dateTo && standard != null && numOfPeople) {
            getFreeRooms('', dateFrom, dateTo, numOfPeople, standard).then(response => {
                setFreeRooms(response.data);
            })
        } else if (dateFrom && dateTo && numOfPeople) {
            getFreeRooms('conference', dateFrom, dateTo, numOfPeople).then(response => {
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
            const idStay = stay ? 'id_stay' : 'id_conference';
            addStayReservation(type, response.data[idStay], roomId).then(_ => {
                cleanUp();
                setOpen(false);

                if (!stay) {
                    setAlgorithmDialogOpen(true);
                    getAlgorithmData(dateFrom, dateTo, numOfPeople, standard).then(response => {
                        handleOpenAlgorithmDialog(response.data, reservationClient, dateFrom, dateTo);
                    });
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

    const createRoomItem = (room) => {
        const idName = stay ? 'id_room' : 'id_conference_room';
        return <MenuItem value={room[idName]}>{room.name}</MenuItem>;
    }

    const addDisabled = [dateFrom, dateTo, numOfPeople, roomId, standard].some(isEmpty)
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
            <StandardDropdown
                standard={standard}
                setStandard={setStandard}
                label={stay 
                    ? 'standard pokoju'
                    : 'standard pokojów dla uczestników'
                }
            />
            
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