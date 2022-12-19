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

const Home = () => {

    const { userData } = useAuth();
    const { id_worker: workerId, name, surname, priviliges } = userData;

    const [pageKey, setPageKey] = useState('');

    const renderPageContent = (key) => {
        switch (key) {
            case 'calendar':
                return <Calendar/>
            case 'reservations':
                return <Reservations  workerId={workerId}/>;
            case 'rooms':
                return <GenericList pageKey='rooms/rooms' admin={false}/>
            case 'conference_rooms':
                return <GenericList pageKey='rooms/conferencerooms' admin={false}/>
            case 'adminPanel':
                return <AdminPanel/>
            default: 
                return <MerryChristmas />;
        }
    }

    return (
        <div style={commonStyles.page}>
            <div style={commonStyles.spaceEvenlycolumn}>
                <div style={styles.navigationBar}>
                    <Navigation 
                        setKey={setPageKey} 
                        login={`${name} ${surname}` }
                        pageKey={pageKey} 
                        admin={priviliges} 
                    />
                </div>
                <div style={styles.content}>
                    {renderPageContent(pageKey)}
                </div>
            </div>
        </div>
    )
}

export default Home;