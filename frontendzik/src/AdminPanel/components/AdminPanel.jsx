import commonStyles from "../../styles/commonStyles";
import styles from '../styles/adminPanelStyles';
import React, { useState } from 'react';
import GenericList from "../../generic/components/GenericList";

const AdminMenu = ({setPageKey}) => {
    return (
        <div style={commonStyles.spaceEvenlycolumn}>
            <button style={styles.adminButton} onClick={() => setPageKey('rooms/rooms')}>
                Zarządzaj pokojami
            </button>
            <button style={styles.adminButton} onClick={() => setPageKey('rooms/conferencerooms')}>

                Zarządzaj salami
            </button>
            <button style={styles.adminButton} onClick={() => setPageKey('users/workers')}>
                Zarządzaj kontami
            </button>
        </div>
    )
}


const AdminPanel = () => {

    const [pageKey, setPageKey] = useState('');

    const renderContent = () => {
        switch (pageKey) {
            case 'rooms/rooms':
                return <GenericList pageKey={pageKey} admin={true} goBack={setPageKey}/>
            case 'rooms/conferencerooms':
                return <GenericList pageKey={pageKey} admin={true} goBack={setPageKey}/>
            case 'users/workers':
                return <GenericList pageKey={pageKey} admin={true} goBack={setPageKey}/>
            default:
                return <AdminMenu setPageKey={setPageKey}/>
        }
    }

    return (
        <>
            {renderContent()}
        </>
    );
}


export default AdminPanel;