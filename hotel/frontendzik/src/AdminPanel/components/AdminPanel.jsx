import commonStyles from "../../styles/commonStyles";
import styles from '../styles/adminPanelStyles';

const AdminPanel = () => {
    return (
        <div style={commonStyles.spaceEvenlycolumn}>
            <button style={styles.adminButton}>
                <label style={styles.text}>Zarządzaj pokojami</label>
            </button>
            <button style={styles.adminButton}>
            <label style={styles.text}>Zarządzaj salami</label>
            </button>
            <button style={styles.adminButton}>
            <label style={styles.text}>Zarządzaj kontami</label>
            </button>
        </div>
    )
}

export default AdminPanel;