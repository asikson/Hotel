import { Dialog  } from '@mui/material';
import commonDialogStyles from '../styles/commonDialogStyles';
import styles from '../styles/addReservationDialogStyles';
import React, { useState, useEffect } from 'react';
import { getClientById, getWorkerById } from '../../utils/api';
import LoadingOverlay from '../../generic/components/LoadingOverlay';

const ReservationDetailsDialog = ({open, setOpen, item}) => {

    const [loading, setLoading] = useState(true);
    const [clientInfo, setClientInfo] = useState('');
    const [workerInfo, setWorkerInfo] = useState('');

    useEffect(() => {
        if (item) {
            getClientById(item['id_client']).then(response => {
                const data = response.data[0];
                const name = data.name;
                const surname = data.surname;
                setClientInfo(`${name} ${surname}`);
    
                getWorkerById(item['id_worker']).then(response => {
                    const data = response.data[0];
                    const name = data.name;
                    const surname = data.surname;
                    setWorkerInfo(`${name} ${surname}`);
                    setLoading(false);
                });
            });
        }
    }, [item]);

    return (
        <Dialog fullScreen open={open} style={commonDialogStyles.dialog} title='Szczegóły rezerwacji' >
            <div style={commonDialogStyles.basicColumn}>
                <div style={commonDialogStyles.topBar}>
                    <div style={commonDialogStyles.topLeft}>
                        <label style={commonDialogStyles.label}>
                            Szczegóły rezerwacji
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
                    {loading 
                        ? <LoadingOverlay loading={loading} />
                        : <>
                            <div style={styles.container}>
                                <label style={commonDialogStyles.labelText}>
                                    Klient:
                                </label>
                                <label style={commonDialogStyles.labelText}>
                                    {clientInfo}
                                </label>
                            </div>
                            
                            <div style={styles.container}>
                                <label style={commonDialogStyles.labelText}>
                                    Pracownik:
                                </label>
                                <label style={commonDialogStyles.labelText}>
                                    {workerInfo}
                                </label>
                            </div>
                        </>
                    }
                </div>
                
            </div>
        </Dialog>
    );
}

export default ReservationDetailsDialog;