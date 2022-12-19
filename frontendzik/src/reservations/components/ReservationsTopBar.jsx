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
                onChange={(event, value) => {
                  if (value) {
                    return setToggleKey(value);
                  }
                  return () => {};
                }}
              >
                <ToggleButton value='stay'>Pokoje</ToggleButton>
                <ToggleButton value='conference'>Sale konferencyjne</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div style={styles.topRight}>
              {onAddButtonClick
                ? <button style={styles.addButton} onClick={onAddButtonClick}>Dodaj</button>
                : null
              }
            </div>
          </div>
    );
}

export default ReservationsTopBar;