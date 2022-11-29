import { useState } from 'react';
import ListTable from '../../generic/components/ListTable';
import styles from '../styles/reservationsStyles'
import ReservationsTopBar from './ReservationsTopBar';
import { getItems } from '../../utils/api';
import LoadingOverlay from '../../generic/components/LoadingOverlay';
import { useEffect } from 'react';
import AddReservationDialog from '../../dialogs/components/AddReservationDialog';

const labels = {
    'stay': {
        reservation_date: 'Data rezerwacji',
        from_date: 'Od',
        to_date: 'Do',
        number_of_people: 'Liczba osób',
        check_in: 'Zameldowanie',
        check_out: 'Wymeldowanie',
        id_client: 'Klient',
        id_worker: 'Pracownik'
    },
    'conference': {
        reservation_date: 'Data rezerwacji',
        from_date: 'Od',
        to_date: 'Do',
        number_of_people: 'Liczba osób',
        id_worker: 'Pracownik',
        id_client: 'Klient'
    }
}

const Reservations = ({ workerId }) => {

    const [toggleKey, setToggleKey] = useState('stay');
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        getItems(`reservations/${toggleKey}reservation`).then(response => {
            setItems(response);
            setLoading(false);
        });
    };

    const onAddButtonClick = () => {
        setAddDialogOpen(true);
    }

    return (
        <div style={styles.container}>
            <ReservationsTopBar toggleKey={toggleKey} setToggleKey={setToggleKey} onAddButtonClick={onAddButtonClick}/>
            {loading
                ? <LoadingOverlay laoding={loading} />
                : <ListTable items={items} labels={labels[toggleKey]} admin={true}/>
            }
            <AddReservationDialog 
                open={addDialogOpen} 
                setOpen={setAddDialogOpen} 
                type={toggleKey} 
                refresh={refresh} 
                update={false} 
                workerId={workerId}
            />
        </div>
    )
}

export default Reservations;