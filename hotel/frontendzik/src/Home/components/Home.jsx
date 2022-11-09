import styles from '../styles/homeStyles';
import commonStyles from '../../styles/commonStyles.js';
import Navigation from './Navigation';
import { useState } from 'react';
import AdminPanel from '../../AdminPanel/components/AdminPanel';
import { useAuth } from '../../authorization/useAuth';
import GenericList from '../../generic/components/List';
import Add from '../../generic/components/Add';

const Home = () => {
    const { login } = useAuth();
    const [pageKey, setPageKey] = useState('');

    const renderContent = (key) => {
        switch (key) {
            case 'adminPanel':
                return <AdminPanel/>
            case 'rooms':
                return <GenericList />
            case 'conference_rooms':
                return <Add type={'room'} />
            default: 
                return null;
        }
    }

    return (
        <div style={commonStyles.page}>
            <div style={commonStyles.spaceEvenlycolumn}>
                <div style={styles.navigationBar}>
                    <Navigation setKey={setPageKey} login={login} pageKey={pageKey}/>
                </div>
                <div style={styles.content}>
                    {renderContent(pageKey)}
                </div>
            </div>
        </div>
    )
}

export default Home;