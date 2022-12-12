import commonStyles from '../../styles/commonStyles';
import styles from '../styles/homeStyles';
import { useAuth } from '../../authorization/useAuth';
import NavigationButton from './NavigationButton';


const Navigation = ({setKey, login, pageKey, admin}) => {

    const { token, onLogout } = useAuth();

    return (
        <div style={styles.navigationBar}>
            <div style={styles.buttonsLayout}>
                
                <NavigationButton label={'Kalendarz'} buttonKey={'calendar'} pageKey={pageKey} onClick={() => setKey('calendar')}/>
                <NavigationButton label={'Rezerwacje'} buttonKey={'reservations'} pageKey={pageKey} onClick={() => setKey('reservations')} />
                <NavigationButton label={'Pokoje'} buttonKey={'rooms'} pageKey={pageKey} onClick={() => setKey('rooms')} />
                <NavigationButton label={'Sale konferencyjne'} buttonKey={'conference_rooms'} pageKey={pageKey} onClick={() => setKey('conference_rooms')} />

                {admin &&<NavigationButton label={'Panel administratora'} buttonKey={'adminPanel'} pageKey={pageKey} onClick={() => setKey('adminPanel')} /> }

            </div>
            <label style={commonStyles.label}>Witaj {login}!</label>
            <button style={commonStyles.button} onClick={onLogout}>Wyloguj się</button>
        </div>
        
    
    )
}

export default Navigation;