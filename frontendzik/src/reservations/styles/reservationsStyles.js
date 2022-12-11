import { black } from "../../styles/constants";

const styles = {
    container: {
        width: '100%',
        height: '100%',
    },

    topBar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },

    topRight: {
        width: '50%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '4%'
    },

    topLeft: {
        width: '50%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '3%',
        alignItems: 'center'
    },

    addButton: {
        borderRadius: '25px',
        width: '90px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: black,
        marginRight: '15px',
        margin: '10px'
    },

    toggle: {
        height: '35px',
    }
};

export default styles;