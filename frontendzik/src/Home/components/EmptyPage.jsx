import commonStyles from '../../styles/commonStyles';
import styles from '../../Login/styles/loginStyles';

const EmptyPage = () => {
    
    return (
            <div style={styles.container}>
                <div style={commonStyles.spaceEvenlycolumn}>
                    <label style={styles.header}>Coś tu pusto...</label>
                </div>
            </div>
    )
}

export default EmptyPage;