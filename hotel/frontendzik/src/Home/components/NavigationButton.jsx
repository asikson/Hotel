import commonStyles from "../../styles/commonStyles"

const NavigationButton = ({label, onClick}) => {
    return (
        <button
            style={commonStyles.button}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default NavigationButton;