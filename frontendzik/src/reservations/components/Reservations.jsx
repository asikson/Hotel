import { useState } from 'react';
import ListTable from '../../generic/components/ListTable';
import styles from '../styles/reservationsStyles'
import ReservationsTopBar from './ReservationsTopBar';
import { getItems, deleteStayReservation, idNames } from '../../utils/api';
import LoadingOverlay from '../../generic/components/LoadingOverlay';
import { useEffect } from 'react';
import AddReservationDialog from '../../dialogs/components/AddReservationDialog';
import DeleteDialog from '../../dialogs/components/DeleteDialog';

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
    const [clients, setClients] = useState([]);
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({});

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        if (toggleKey === 'conference') {
            setItems(conferenceItems);
        } else {
            setItems(stayItems);
        }
    }, [stayItems, conferenceItems]);

    useEffect(() => {
        const currentItems = toggleKey === 'conference' ? conferenceItems : stayItems;
        setItems(currentItems);
        setCurrentItem({});  
    }, [toggleKey]);

    const refresh = () => {
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
    };

    const onDeleteButtonClick = (item) => {
        setCurrentItem(item);
        setDeleteDialogOpen(true);
    };

    const handleDelete = (item) => {
        const endpoint = `reservations/${toggleKey}reservation`;
        deleteStayReservation(endpoint, item[idNames[endpoint]]).then(_ => {
            setDeleteDialogOpen(false);
            refresh();
        })
    };

    return (
        <div style={styles.container}>
            <ReservationsTopBar toggleKey={toggleKey} setToggleKey={setToggleKey} onAddButtonClick={onAddButtonClick}/>
            {loading
                ? <LoadingOverlay laoding={loading} />
                : <ListTable 
                    items={items} 
                    labels={labels[toggleKey]} 
                    admin={true} 
                    onUpdateButtonClick={onEditButtonClick}
                    onDeleteButtonClick={onDeleteButtonClick}
                />
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
            <DeleteDialog 
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                item={currentItem}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default Reservations;