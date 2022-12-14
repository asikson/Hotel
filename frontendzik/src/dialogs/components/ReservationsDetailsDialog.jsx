import { Dialog  } from '@mui/material';
import commonDialogStyles from '../styles/commonDialogStyles';
import styles from '../styles/addReservationDialogStyles';
import React, { useState, useEffect } from 'react';
import { getClientById, getRoomById, getRoomForStay, getWorkerById } from '../../utils/api';
import LoadingOverlay from '../../generic/components/LoadingOverlay';
import { getStandardName } from '../../utils/constants';

const ReservationDetailsDialog = ({open, setOpen, item}) => {

    const [loading, setLoading] = useState(true);
    const [clientInfo, setClientInfo] = useState('');
    const [workerInfo, setWorkerInfo] = useState('');
    const [roomInfo, setRoomInfo] = useState('');

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

                    getRoomForStay(item['id_stay']).then(response => {
                        const roomId = response.data[0].id_room;
                        
                        getRoomById(roomId).then(response => {
                            const data = response.data[0];
                            setRoomInfo(`${data.name} - ${getStandardName(data.standard)}`);
                            setLoading(false);
                        })
                    });
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
                            <label style={commonDialogStyles.xLabel}>X</label>
                        </button>
                    </div>
                </div>

                <div style={styles.container}>
                    {loading 
                        ? <LoadingOverlay loading={loading} />
                        : <>
                            <div style={styles.container}>
                                <label style={commonDialogStyles.labelText}>
                                    Data:
                                </label>
                                <label style={commonDialogStyles.labelText}>
                                    {`${item.from_date}  ->  ${item.to_date}`}
                                </label>
                            </div>

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

                            <div style={styles.container}>
                                <label style={commonDialogStyles.labelText}>
                                    Pokój:
                                </label>
                                <label style={commonDialogStyles.labelText}>
                                    {roomInfo}
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