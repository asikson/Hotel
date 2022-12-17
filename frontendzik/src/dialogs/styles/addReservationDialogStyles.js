import { black, snowWhite, orange } from "../../styles/constants";

const styles = {
    input: {
        backgroundColor: snowWhite,
        width: '220px',
        height: '60px',
        marginBottom: '20px',
    },

    button: {
        borderRadius: '25px',
        width: '100px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: black,
        margin: '15px',
        backgroundColor: orange
    },

    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '30px'
    },

    sideToSide: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: '20px',
    },

    dateInput: {
        width: '170px',
        height: '60px',
    },

    newClientForm: {
        width: '220px',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px'
    },

    checkbox: {
        marginLeft: '10px', 
        marginTop: '10px'
    }
}

export default styles;