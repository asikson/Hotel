import React from 'react';
import { Dialog  } from '@mui/material';
import styles from '../styles/addDialogStyles';
import commonStyles from '../../styles/commonStyles';
import commonDialogStyles from '../styles/commonDialogStyles';
import ReservationInput from './ReservationInput';

const AddReservationDialog = ({open, setOpen, type, refresh, update, item, workerId, clients}) => {

    return (
        <Dialog fullScreen open={open} style={commonDialogStyles.dialog} title='Dodaj' >
            <div style={commonStyles.basicColumn}>
                <div style={commonDialogStyles.topBar}>
                    <div style={commonDialogStyles.topLeft}>
                        <label style={commonDialogStyles.label}>
                            {update ? 'Edytuj' : 'Dodaj'}
                        </label>
                    </div>
                    <div style={commonDialogStyles.topRight}>
                        <button 
                            style={commonDialogStyles.xButton}
                            onClick={() => setOpen(false)}
                        >
                            <label style={commonDialogStyles.label}>X</label>
                        </button>
                    </div>
                </div>
                <div style={styles.container}>
                    <ReservationInput 
                        update={update} 
                        setOpen={setOpen} 
                        item={item} 
                        type={type} 
                        refresh={refresh} 
                        workerId={workerId}
                        clients={clients}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default AddReservationDialog;