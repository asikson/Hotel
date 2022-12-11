import React from 'react';
import { Dialog  } from '@mui/material';
import styles from '../styles/addDialogStyles';
import commonStyles from '../../styles/commonStyles';
import commonDialogStyles from '../styles/commonDialogStyles';
import RoomsInput from './RoomsInput';
import UsersInput from './UsersInput';

const AddDialog = ({open, setOpen, type, refresh, item }) => {

    const renderContent = () => {
        switch (type) {
            case 'rooms/rooms':
            case 'rooms/conferencerooms':
                return <RoomsInput setOpen={setOpen} refresh={refresh} type={type} item={item} />

            case 'users/workers':
                return <UsersInput setOpen={setOpen} refresh={refresh} type={type} item={item} />
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
                            {item ? 'Edytuj' : 'Dodaj'}
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
                </div>
            </div>
        </Dialog>
    );
}

export default AddDialog;