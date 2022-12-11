import styles from '../styles/homeStyles';
import commonStyles from '../../styles/commonStyles.js';
import Navigation from './Navigation';
import { useState } from 'react';
import AdminPanel from '../../AdminPanel/components/AdminPanel';
import { useAuth } from '../../authorization/useAuth';
import GenericList from '../../generic/components/GenericList';
import Calendar from '../../Calendar/components/Calendar';
import Reservations from '../../reservations/components/Reservations';
import MerryChristmas from './MerryChristmas';
import { MOCEVENTS } from '../../Calendar/components/const';

const Home = () => {
    const { login } = useAuth();
    const workerId = 1;
    const [pageKey, setPageKey] = useState('');

    const renderContent = (key) => {
        switch (key) {
            case 'adminPanel':
                return <AdminPanel/>

            case 'calendar':
                return <Calendar workerId={workerId} startingDate={new Date()} eventsArr={MOCEVENTS}/>    
            case 'rooms':
                return <GenericList pageKey='rooms/rooms'/>
            case 'conference_rooms':
                return <GenericList pageKey='rooms/conferencerooms'/>

            case 'rooms':
                return <GenericList pageKey='rooms/rooms' admin={false}/>
            case 'conference_rooms':
                return <GenericList pageKey='rooms/conferencerooms' admin={false}/>
            case 'reservations':
                return <Reservations  workerId={workerId}/>;
            default: 
                return <MerryChristmas />;
        }
    }

    return (
        <div style={commonStyles.page}>
            <div style={commonStyles.spaceEvenlycolumn}>
                <div style={styles.navigationBar}>
                    <Navigation setKey={setPageKey} login={login} pageKey={pageKey} admin={login === 'admin'} />
                </div>
                <div style={styles.content}>
                    {renderContent(pageKey)}
                </div>
            </div>
        </div>
    )
}

export default Home;