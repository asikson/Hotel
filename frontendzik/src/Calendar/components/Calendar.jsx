import { useState, useEffect } from 'react';
import { getCalendarData, getItems } from '../../utils/api';
import styles from '../../generic/styles/listStyles';
import CalendarListTable from './CalendarListTable';
import LoadingOverlay from '../../generic/components/LoadingOverlay';
import ReservationsTopBar from '../../reservations/components/ReservationsTopBar';
import { transformData } from '../utils/calendarUtils';

const columns = ['2022-12-12', '2022-12-13', '2022-12-14', '2022-12-15', '2022-12-16', '2022-12-17', '2022-12-18'];

const Calendar = () => {
   
    const [loading, setLoading] = useState(true);
    const [toggleKey, setToggleKey] = useState('stay');
    const [items, setItems] = useState([]);
    const [reservationData, setReservationData] = useState([]);

    useEffect(() => {
        const type = toggleKey === 'stay' ? '' : 'conference'
        getItems(`rooms/${type}rooms`).then(response => {
            setItems(response);
            getCalendarData(toggleKey).then(response => {
                const transformedData = transformData(response.data);
                setReservationData(transformedData);
                setLoading(false);
            });
        });
        
    }, [toggleKey]);

    const idName = toggleKey === 'stay' ? 'id_room' : 'id_conference_room';

    return(
        <div style={styles.container}>
            <ReservationsTopBar toggleKey={toggleKey} setToggleKey={setToggleKey} />
            {loading
                ? <LoadingOverlay loading={loading} />
                : <CalendarListTable 
                    columns={columns} 
                    rooms={items} 
                    reservationData={reservationData}
                    idName={idName}
                />
            }
        </div>
    );
}

export default Calendar;