import styles from '../styles/reservationsStyles';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const ReservationsTopBar = ({onAddButtonClick, toggleKey, setToggleKey}) => {

    return (
        <div style={styles.topBar}>
            <div style={styles.topLeft}>
              <ToggleButtonGroup
                style={styles.toggle}
                color="warning"
                exclusive
                aria-label="Platform"
                value={toggleKey}
                onChange={(event, value) => setToggleKey(value)}
              >
                <ToggleButton value='stay'>Pokoje</ToggleButton>
                <ToggleButton value='conference'>Sale konferencyjne</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div style={styles.topRight}>
              <button style={styles.addButton} onClick={onAddButtonClick}>Dodaj</button>
            </div>
          </div>
    );
}

export default ReservationsTopBar;