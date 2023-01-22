import { useState, useEffect } from 'react';
import { getCalendarData, getItems } from '../../utils/api';
import styles from '../../generic/styles/listStyles';
import CalendarListTable from './CalendarListTable';
import LoadingOverlay from '../../generic/components/LoadingOverlay';
import ReservationsTopBar from '../../reservations/components/ReservationsTopBar';
import DateTopBar from './DateTopBar';
import { getDatesFromCurrentWeek, transformData } from '../utils/calendarUtils';

const Calendar = () => {

    const [loading, setLoading] = useState(true);
    const [toggleKey, setToggleKey] = useState('stay');
    const [items, setItems] = useState([]);
    const [reservationData, setReservationData] = useState([]);
    const [columns, setColumns] = useState(getDatesFromCurrentWeek());

    useEffect(() => {
        localStorage.clear();
    }, []);

    useEffect(() => {
        const type = toggleKey === 'stay' ? '' : 'conference';
        setLoading(true);
        getItems(`rooms/${type}rooms`).then(response => {
            setItems(response);
            const storedData = localStorage.getItem(columns[0])
            if (!storedData) {
                getCalendarData(toggleKey, columns[0], columns[6]).then(response => {
                    const transformedData = transformData(response.data, toggleKey);
                    setReservationData(transformedData);
                    setLoading(false);
                    localStorage.setItem(columns[0], JSON.stringify(transformedData));
                });
            } else {
                setReservationData(JSON.parse(storedData));
                setLoading(false);
            }
        });
        
    }, [toggleKey]);

    useEffect(() => {
        const storedData = localStorage.getItem(columns[0])
            if (!storedData) {
                setLoading(true);
                getCalendarData(toggleKey, columns[0], columns[6]).then(response => {
                    const transformedData = transformData(response.data, toggleKey);
                    setReservationData(transformedData);
                    setLoading(false);
                    localStorage.setItem(columns[0], JSON.stringify(transformedData));
                });
            } else {
                setReservationData(JSON.parse(storedData));
                setLoading(false);
            }
    }, [columns]);

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