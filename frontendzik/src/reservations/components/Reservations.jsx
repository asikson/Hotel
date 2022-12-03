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
    const [stayItems, setStayItems] = useState([]);
    const [conferenceItems, setConferenceItems] = useState([]);
    const [items, setItems] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [clients, setClients] = useState([]);
    const [currentItem, setCurrentItem] = useState({});

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        if (toggleKey != 'conference') {
            setItems(stayItems);
        }
    }, [stayItems]);

    useEffect(() => {
        const currentItems = toggleKey === 'conference' ? conferenceItems : stayItems;
        setItems(currentItems);
        setCurrentItem({});  
    }, [toggleKey]);

    const refresh = () => {
        console.log(toggleKey);
        getItems(`reservations/stayreservation/`).then(response => {
            setStayItems(response);
            setLoading(false);
        });
        getItems(`reservations/conferencereservation/`).then(response => {
            setConferenceItems(response);
            setLoading(false);
        });
        getItems('users/clients/').then(response => {
            setClients(response);
        });
    };

    const onAddButtonClick = () => {
        setAddDialogOpen(true);
    };

    const onEditButtonClick = (item) => {
        setCurrentItem(item);
        setUpdateDialogOpen(true);
    }

    return (
        <div style={styles.container}>
            <ReservationsTopBar toggleKey={toggleKey} setToggleKey={setToggleKey} onAddButtonClick={onAddButtonClick}/>
            {loading
                ? <LoadingOverlay laoding={loading} />
                : <ListTable items={items} labels={labels[toggleKey]} admin={true} onUpdateButtonClick={onEditButtonClick}/>
            }
            <AddReservationDialog 
                open={addDialogOpen} 
                setOpen={setAddDialogOpen} 
                type={toggleKey} 
                refresh={refresh} 
                workerId={workerId}
                clients={clients}
            />
            <AddReservationDialog 
                open={updateDialogOpen} 
                setOpen={setUpdateDialogOpen} 
                type={toggleKey} 
                refresh={refresh} 
                workerId={workerId}
                clients={clients}
                item={currentItem}
            />
        </div>
    )
}

export default Reservations;