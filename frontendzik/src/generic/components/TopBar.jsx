const TopBar = ({styles, onGoBackButtonClick, onAddButtonClick}) => {

    return (
        <div style={styles.topBar}>
            <div style={styles.topLeft}>
              <button style={styles.addButton} onClick={onGoBackButtonClick}>Wróć</button>
            </div>
            <div style={styles.topRight}>
              <button style={styles.addButton} onClick={onAddButtonClick}>Dodaj</button>
            </div>
          </div>
    );
}

export default TopBar;