import { useState, useEffect } from 'react';
import { getCalendarData, getItems } from '../../utils/api';
import styles from '../../generic/styles/listStyles';
import CalendarListTable from './CalendarListTable';
import LoadingOverlay from '../../generic/components/LoadingOverlay';
import ReservationsTopBar from '../../reservations/components/ReservationsTopBar';
import { transformData } from '../utils/calendarUtils';
import DateTopBar from './DateTopBar';
import { getDatesFromCurrentWeek } from '../utils/calendarUtils';

const Calendar = () => {
   
    const [loading, setLoading] = useState(true);
    const [toggleKey, setToggleKey] = useState('stay');
    const [items, setItems] = useState([]);
    const [reservationData, setReservationData] = useState([]);
    const [columns, setColumns] = useState(getDatesFromCurrentWeek());

    useEffect(() => {
        const type = toggleKey === 'stay' ? '' : 'conference'
        getItems(`rooms/${type}rooms`).then(response => {
            setItems(response);
            getCalendarData(toggleKey).then(response => {
                const transformedData = transformData(response.data, toggleKey);
                setReservationData(transformedData);
                setLoading(false);
            });
        });
        
    }, [toggleKey]);

    const stay = toggleKey === 'stay';
    const idRoom = stay ? 'id_room' : 'id_conference_room';

    return(
        <div style={styles.container}>
            <ReservationsTopBar toggleKey={toggleKey} setToggleKey={setToggleKey} />
            <DateTopBar columns={columns} setColumns={setColumns}/>
            {loading
                ? <LoadingOverlay loading={loading} />
                : <CalendarListTable 
                    columns={columns}
                    rooms={items} 
                    reservationData={reservationData}
                    idRoom={idRoom}
                    toggleKey={toggleKey}
                />
            }
        </div>
    );
}

export default Calendar;