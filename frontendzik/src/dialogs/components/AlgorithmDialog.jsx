import React, { useState, useEffect } from 'react';
import commonStyles from '../../styles/commonStyles';
import commonDialogStyles from '../styles/commonDialogStyles';
import { Dialog  } from '@mui/material';
import LoadingOverlay from '../../generic/components/LoadingOverlay';
import styles from '../styles/addReservationDialogStyles';
import ListTable from '../../generic/components/ListTable';

const labels = {
    name: 'Nazwa pokoju',
    number_of_people: 'Liczba osób',
    standard: 'Standard'
};

const AlgorithmDialog = ({open, setOpen, data, setData}) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(data === null);
    }, [data]);

    const handleClose = () => {
        setOpen(false);
        setData(null);
    };

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
                    : <ListTable items={data || []} labels={labels}/>
                }
            </div>
        </div>
    </Dialog>
};

export default AlgorithmDialog;