import { Dialog  } from '@mui/material';
import styles from '../styles/addDialogStyles';
import commonStyles from '../../styles/commonStyles';
import commonDialogStyles from '../styles/commonDialogStyles';
import { Input, TextField } from '@mui/material';

const AddDialog = ({open, setOpen, type, handleAdd}) =>{
    const renderContent = () => {
        switch (type) {
            case 'rooms/rooms':
                return <div style={styles.container}>
                        <TextField label='Nazwa pokoju' type='text' style={styles.input} color='warning' />
                        <TextField style={styles.input} type={'number'} label={'Liczba osób'} color='warning' />
                    </div>
            default:
                null;
        }
    }

    return (
        <Dialog fullScreen open={open} style={commonDialogStyles.dialog} title='Dodaj' >
            <div style={commonStyles.basicColumn}>
                <div style={commonDialogStyles.topBar}>
                    <div style={commonDialogStyles.topLeft}>
                        <label style={commonDialogStyles.label}>
                            Dodaj
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
                    {renderContent()}
                    <button style={styles.button}> Dodaj </button>
                </div>
            </div>
        </Dialog>
    );
}

export default AddDialog;