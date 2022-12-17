import { Dialog  } from '@mui/material';
import commonDialogStyles from '../styles/commonDialogStyles';
import styles from '../styles/addReservationDialogStyles';
import { getStandardName } from '../../utils/constants';

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
                            <label style={commonDialogStyles.xLabel}>X</label>
                        </button>
                    </div>
                </div>


                <div style={styles.container}>
                    <div style={styles.container}>
                        <label style={commonDialogStyles.labelText}>
                            Liczba osób:
                        </label>
                        <label style={commonDialogStyles.labelText}>
                            {item.number_of_people}
                        </label>
                    </div>

                    {item.standard && item.price && item.clean_price
                        ? <>
                            <div style={styles.container}>
                                <label style={commonDialogStyles.labelText}>
                                    Standard
                                </label>
                                <label style={commonDialogStyles.labelText}>
                                    {getStandardName(item.standard)}
                                </label>
                            </div>

                            <div style={styles.container}>
                                <label style={commonDialogStyles.labelText}>
                                    Cena:
                                </label>
                                <label style={commonDialogStyles.labelText}>
                                    {`${item.price} PLN`}
                                </label>
                            </div>
                    
                            <div style={styles.container}>
                                <label style={commonDialogStyles.labelText}>
                                    Koszt przygotowania
                                </label>
                                <label style={commonDialogStyles.labelText}>
                                    {`${item.clean_price} PLN`}
                                </label>
                            </div>
                        </>
                        : null
                    }
                </div>
                
            </div>
        </Dialog>
    );
}

export default DetailsDialog;