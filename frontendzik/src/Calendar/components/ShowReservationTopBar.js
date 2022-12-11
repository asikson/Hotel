import styles from '../styles/calendarStyles';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const ShowReservationsTopBar = ({toggleKey, setToggleKey}) => {

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
          </div>
    );
}
export default ShowReservationsTopBar;