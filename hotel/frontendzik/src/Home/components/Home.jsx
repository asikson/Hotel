import styles from '../styles/homeStyles';
import commonStyles from '../../styles/commonStyles.js';
import Navigation from './Navigation';
import { useState } from 'react';
import AdminPanel from '../../AdminPanel/components/AdminPanel';

const Home = () => {
    const [pageKey, setPageKey] = useState('');

    const renderContent = (key) => {
        switch (key) {
            case 'adminPanel':
                return <AdminPanel/>
            default: 
                return null;
        }
    }

    return (
        <div style={commonStyles.page}>
            <div style={commonStyles.spaceEvenlycolumn}>
                <div style={styles.navigationBar}>
                    <Navigation setKey={setPageKey}/>
                </div>
                <div style={styles.content}>
                    {renderContent(pageKey)}
                </div>
            </div>
        </div>
    )
}

export default Home;