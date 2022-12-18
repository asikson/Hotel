import styles from '../styles/calendarStyles';
import { getNextWeek, getPreviousWeek } from '../utils/calendarUtils';

const DateTopBar = ({columns, setColumns}) => {

    const onRightButtonClick = () => {
        const newWeek = getNextWeek(columns);
        setColumns(newWeek);
    };

    const onLeftButtonClick = () => {
        const newWeek = getPreviousWeek(columns);
        setColumns(newWeek);
    };

    return (
        <div style={styles.topBar}>
            <button style={styles.arrowButton} onClick={onLeftButtonClick}>{'<'}</button>
            <label style={styles.label}>{`Tydzień od ${columns[0]} do ${columns[6]}`}</label>
            <button style={styles.arrowButton} onClick={onRightButtonClick}>{'>'}</button>
        </div>
    )
};

export default DateTopBar;