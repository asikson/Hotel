import commonStyles from "../../styles/commonStyles";
import styles from '../styles/adminPanelStyles';

const AdminPanel = () => {
    return (
        <div style={commonStyles.spaceEvenlycolumn}>
            <button style={styles.adminButton}>
                Zarządzaj pokojami
            </button>
            <button style={styles.adminButton}>
                Zarządzaj salami
            </button>
            <button style={styles.adminButton}>
                Zarządzaj kontami
            </button>
        </div>
    )
}

export default AdminPanel;