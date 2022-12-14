import React from 'react';
import commonStyles from '../../styles/commonStyles';
import commonDialogStyles from '../styles/commonDialogStyles';
import { Dialog  } from '@mui/material';

const AlgorithmDialog = ({open}) => {
    <Dialog fullScreen open={open} style={commonDialogStyles.dialog} title='Konferencja' >
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
                        onClick={() => setOpen(false)}
                    >
                        <label style={commonDialogStyles.xLabel}>X</label>
                    </button>
                </div>
            </div>
        </div>
    </Dialog>
};

export default AlgorithmDialog;