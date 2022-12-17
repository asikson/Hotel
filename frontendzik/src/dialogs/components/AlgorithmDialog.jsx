import React, { useState, useEffect } from 'react';
import commonStyles from '../../styles/commonStyles';
import commonDialogStyles from '../styles/commonDialogStyles';
import { Dialog  } from '@mui/material';

import styles from '../styles/addReservationDialogStyles';
import ListTable from '../../generic/components/ListTable';
import { addReservation, addStayReservation } from '../../utils/api';

const labels = {
    name: 'Nazwa pokoju',
    number_of_people: 'Liczba osób',
    standard: 'Standard'
};

const AlgorithmDialog = (
    {
        open, 
        setOpen,
        data, 
        setData, 
        clientId, 
        workerId, 
        dateFrom, 
        dateTo,
        refresh
    }
) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(data === null);
    }, [data]);

    const handleClose = () => {
        setOpen(false);
        setData(null);
    };

    const handleAddReservation = async (item) => {
        return addReservation('stay', clientId, workerId, dateFrom, dateTo, item.number_of_people).then(response => {
            addStayReservation('stay', response.data.id_stay, item.id_room);
        });
    }

    const handleConfirm = async () => {
        const reservations = data.map(item => 
            handleAddReservation(item)
        );
        return Promise.all(reservations).then(_ => {
            setOpen(false);
            refresh();
        });
    }

    return <Dialog fullScreen open={open} style={commonDialogStyles.dialog} title='Konferencja' >
        <div style={commonStyles.basicColumn}>
            <div style={commonDialogStyles.topBar}>
                <div style={commonDialogStyles.topLeft}>
                    <label style={commonDialogStyles.label}>
                        Rozmieść uczestników
                    </label>
                </div>
                <div style={commonDialogStyles.topRight}>
                    <button 
                        style={commonDialogStyles.xButton}
                        onClick={handleClose}
                    >
                        <label style={commonDialogStyles.xLabel}>X</label>
                    </button>
                </div>
            </div>
            
            <div style={styles.container}>
                {loading 
                    ? <label style={commonDialogStyles.labelText}>Obliczam...</label>
                    : <>
                        <ListTable items={data || []} labels={labels} details={false}/>
                        <button style={styles.button} onClick={handleConfirm}>Zatwierdź</button>
                    </>
                }
            </div>
        </div>
    </Dialog>
};

export default AlgorithmDialog;