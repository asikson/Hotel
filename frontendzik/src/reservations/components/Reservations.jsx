import { useState } from 'react';
import ListTable from '../../generic/components/ListTable';
import styles from '../styles/reservationsStyles'
import ReservationsTopBar from './ReservationsTopBar';
import { deleteItem, getItems } from '../../utils/api';
import LoadingOverlay from '../../generic/components/LoadingOverlay';
import { useEffect } from 'react';
import AddReservationDialog from '../../dialogs/components/AddReservationDialog';
import DeleteDialog from '../../dialogs/components/DeleteDialog';
import ReservationDetailsDialog from '../../dialogs/components/ReservationsDetailsDialog';
import { getIdValue } from '../../utils/apiUtils';
import { reservationLabels } from '../../utils/constants';
import AlgorithmDialog from '../../dialogs/components/AlgorithmDialog';

const Reservations = ({ workerId }) => {

    const [toggleKey, setToggleKey] = useState('stay');
    const [loading, setLoading] = useState(true);

    const [stayItems, setStayItems] = useState([]);
    const [conferenceItems, setConferenceItems] = useState([]);
    const [clients, setClients] = useState([]);
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    const [algorithmData, setAlgorithmData] = useState(null);
    const [currentClient, setCurrentClient] = useState(null);
    const [currentDateFrom, setCurrentDateFrom] = useState(null);
    const [currentDateTo, setCurrentDateTo] = useState(null);

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [algorithmDialogOpen, setAlgorithmDialogOpen] = useState(false);

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
    }, [toggleKey]);

    const refresh = () => {
        getItems(`reservations/stayreservation`).then(response => {
            setStayItems(response);
            setLoading(false);
        });
        getItems(`reservations/conferencereservation`).then(response => {
            setConferenceItems(response);
            setLoading(false);
        });
        getItems('users/clients').then(response => {
            setClients(response);
        });
    };

    const onAddButtonClick = () => {
        setAddDialogOpen(true);
    };

    const onDeleteButtonClick = (item) => {
        setCurrentItem(item);
        setDeleteDialogOpen(true);
    };

    const onDetailsDialogClick = (item) => {
        setCurrentItem(item);
        setDetailsDialogOpen(true);
    };

    const handleDelete = (item) => {
        const endpoint = `reservations/${toggleKey}reservation`;

        deleteItem(endpoint, getIdValue(endpoint, item)).then(_ => {
            setDeleteDialogOpen(false);
            refresh();
        });
    };

    const handleOpenAlgorithmDialog = (data, clientId, dateFrom, dateTo) => {
        setAlgorithmData(data);
        setCurrentClient(clientId);
        setCurrentDateFrom(dateFrom);
        setCurrentDateTo(dateTo);
    };

    return (
        <div style={styles.container}>
            <ReservationsTopBar toggleKey={toggleKey} setToggleKey={setToggleKey} onAddButtonClick={onAddButtonClick}/>
            {loading
                ? <LoadingOverlay laoding={loading} />
                : <ListTable 
                    items={items} 
                    labels={reservationLabels[toggleKey]} 
                    admin={true} 
                    onDeleteButtonClick={onDeleteButtonClick}
                    onDetailsButtonClick={onDetailsDialogClick}
                />
            }
            <AddReservationDialog 
                open={addDialogOpen} 
                setOpen={setAddDialogOpen} 
                type={toggleKey} 
                refresh={refresh} 
                workerId={workerId}
                clients={clients}
                setAlgorithmDialogOpen={setAlgorithmDialogOpen}
                handleOpenAlgorithmDialog={handleOpenAlgorithmDialog}
            />
            <DeleteDialog 
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                item={currentItem}
                handleDelete={handleDelete}
            />
            <ReservationDetailsDialog
                open={detailsDialogOpen}
                setOpen={setDetailsDialogOpen}
                item={currentItem}
                toggleKey={toggleKey}
            />
            <AlgorithmDialog
                open={algorithmDialogOpen}
                setOpen={setAlgorithmDialogOpen}
                data={algorithmData}
                setData={setAlgorithmData}
                clientId={currentClient}
                workerId={workerId}
                dateFrom={currentDateFrom}
                dateTo={currentDateTo}
                refresh={refresh}
            />
        </div>
    )
}

export default Reservations;