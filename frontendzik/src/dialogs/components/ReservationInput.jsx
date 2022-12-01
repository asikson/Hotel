import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState, useEffect, Fragment } from 'react';
import styles from '../styles/addReservationDialogStyles';
import { addItem, updateItem, idNames } from '../../utils/api';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ClientSelect from './ClientSelect';

const ReservationInput = ({ update, setOpen, item, type, refresh, workerId, clients }) => {

    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [numOfPeople, setNumOfPeople] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [newClient, setNewClient] = useState(false);
    const [clientId, setClientId] = useState(null);

    useEffect(() => {
        if (item) {
            setDateFrom(item.from_date);
            setDateTo(item.to_date);
            setNumOfPeople(item.number_of_people);
            setClientId(item.id_client);
        }
    }, [item]);

    const cleanUp = () => {
        setDateFrom('');
        setDateTo('');
        setNumOfPeople('');
        setClientId('');
        refresh();
    }

    const handleAdd = () => { 
        //addItem(type, dateRange[0], dateRange[1], numOfPeople, clientId, workerId).then(_ => cleanUp())
    };

    return (
        <div style={styles.container}>
            <div style={styles.sideToSide}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div style={styles.dateInput}>
                        <DesktopDatePicker
                            label="Od"
                            inputFormat="MM/DD/YYYY"
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
                    : <ClientSelect clients={clients}/>
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
            
            {update
                ? <button style={styles.button} onClick={handleUpdate}>Zapisz</button>
                : <button style={styles.button} onClick={handleAdd}>Dodaj</button>
            }
        </div>
    )
}

export default ReservationInput;