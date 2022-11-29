import { TextField } from '@mui/material';
import React, { useState, useEffect, Fragment } from 'react';
import styles from '../styles/addReservationDialogStyles';
import { addItem, updateItem, idNames } from '../../utils/api';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ReservationInput = ({ update, setOpen, item, type, refresh, workerId }) => {

    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [numOfPeople, setNumOfPeople] = useState('');
    const [clientId, setClientId] = useState(null);

    useEffect (() => {
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
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                    <div style={styles.dateInput}>
                        <DesktopDatePicker
                            label="Do"
                            inputFormat="MM/DD/YYYY"
                            value={dateTo}
                            onChange={(value) => setDateTo(value)}
                            renderInput={(params) => <TextField {...params} />}
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
            {update
                ? <button style={styles.button} onClick={handleUpdate}>Zapisz</button>
                : <button style={styles.button} onClick={handleAdd}>Dodaj</button>
            }
        </div>
    )
}

export default ReservationInput;