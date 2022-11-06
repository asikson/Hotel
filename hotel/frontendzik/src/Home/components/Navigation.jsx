import commonStyles from '../../styles/commonStyles';
import styles from '../styles/homeStyles';
import { useAuth } from '../../authorization/useAuth';
import NavigationButton from './NavigationButton';

const Navigation = ({setKey}) => {
    const { token, onLogout } = useAuth();

    return (
        <div style={styles.navigationBar}>
            <div style={styles.buttonsLayout}>
                <NavigationButton label={'Kalendarz'} onClick={() => setKey('calendar')}/>
                <NavigationButton label={'Rezerwacje'} onClick={() => setKey('reservations')} />
                <NavigationButton label={'Pokoje'} onClick={() => setKey('rooms')} />
                <NavigationButton label={'Sale konferencyjne'} onClick={() => setKey('conference_rooms')} />
                <NavigationButton label={'Panel administratora'} onClick={() => setKey('adminPanel')} />
            </div>
            <button style={commonStyles.button} onClick={onLogout}>Wyloguj się</button>
        </div>
        
    
    )
}

export default Navigation;