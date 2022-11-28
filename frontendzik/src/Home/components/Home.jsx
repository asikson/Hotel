import styles from '../styles/homeStyles';
import commonStyles from '../../styles/commonStyles.js';
import Navigation from './Navigation';
import { useState } from 'react';
import AdminPanel from '../../AdminPanel/components/AdminPanel';
import { useAuth } from '../../authorization/useAuth';
import GenericList from '../../generic/components/GenericList';
import Calendar from '../../Calendar/components/Calendar';


const Home = () => {
    const { login } = useAuth();
    const [pageKey, setPageKey] = useState('');

    const renderContent = (key) => {
        switch (key) {
            case 'adminPanel':
                return <AdminPanel/>

            case 'calendar':
                return <Calendar/>    
            case 'rooms':
                return <GenericList pageKey='rooms/rooms'/>
            case 'conference_rooms':
                return <GenericList pageKey='rooms/conferencerooms'/>

            case 'rooms':
                return <GenericList pageKey='rooms/rooms' admin={false}/>
            case 'conference_rooms':
                return <GenericList pageKey='rooms/conferencerooms' admin={false}/>

            default: 
                return null;
        }
    }

    return (
        <div style={commonStyles.page}>
            <div style={commonStyles.spaceEvenlycolumn}>
                <div style={styles.navigationBar}>

                    <Navigation setKey={setPageKey} login={login} pageKey={pageKey} admin={login === 'admin'}/>

                </div>
                <div style={styles.content}>
                    {renderContent(pageKey)}
                </div>
            </div>
        </div>
    )
}

export default Home;