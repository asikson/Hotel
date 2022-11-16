import commonStyles from "../../styles/commonStyles";
import styles from '../styles/loginStyles';

const ErrorPage = () => {
    
    return (
        <div style={commonStyles.page}>
            <div style={styles.container}>
                <div style={commonStyles.spaceEvenlycolumn}>
                    <label style={styles.header}>Page not found!</label>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;