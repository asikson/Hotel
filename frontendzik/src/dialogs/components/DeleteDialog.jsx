import styles from '../styles/deleteDialogStyles';
import commonDialogStyles from '../styles/commonDialogStyles';
import commonStyles from '../../styles/commonStyles';
import { Dialog } from '@mui/material';


const DeleteDialog = ({open, setOpen, item, handleDelete }) => {

    return (
        <Dialog fullScreen open={open} style={styles.dialog} title='Dodaj' >
            <div style={commonStyles.basicColumn}>
                <div style={commonDialogStyles.topBar}>
                    <div style={commonDialogStyles.topLeft}>
                        <label style={styles.label}>
                            Czy na pewno usunąć?
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
                    <button style={styles.button} onClick={() => handleDelete(item)}>OK</button>
                </div>
            </div>
        </Dialog>
    );
}

export default DeleteDialog;