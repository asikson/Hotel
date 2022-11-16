import commonStyles from "../../styles/commonStyles"

const NavigationButton = ({label, onClick, buttonKey, pageKey}) => {
    return (
        <button
            style={pageKey === buttonKey ? commonStyles.coloredButton : commonStyles.button}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default NavigationButton;