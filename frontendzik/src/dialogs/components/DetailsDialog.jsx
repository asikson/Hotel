import { Dialog  } from '@mui/material';
import commonDialogStyles from '../styles/commonDialogStyles';

const DetailsDialog = ({open, setOpen, item}) => {
    return (
        <Dialog fullScreen open={open} style={commonDialogStyles.dialog} title='Szczegóły' >
            <div style={commonDialogStyles.basicColumn}>
                <div style={commonDialogStyles.topBar}>
                    <div style={commonDialogStyles.topLeft}>
                        <label style={commonDialogStyles.label}>
                            {item.name}
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
            </div>
        </Dialog>
    );
}

export default DetailsDialog;