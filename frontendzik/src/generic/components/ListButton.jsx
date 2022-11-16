import styles from '../styles/listStyles';

const ListButton = ({onClick, item, label}) => 
    <button 
        style={styles.listButton} 
        onClick={() => onClick(item)}
    >
        {label}
    </button>;

export default ListButton;