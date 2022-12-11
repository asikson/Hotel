import { snowWhite, black } from "../../styles/constants";

const styles = {
    dialog: {
        position: 'fixed',
        top: '25%',
        left: '35%',
        overflowY: 'auto',
        height: '170px', 
        width: '25%', 
        background: snowWhite, 
        borderRadius: '25px',
    },
    button: {
        borderRadius: '25px',
        width: '100px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: black,
        margin: '20px'
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    label: {
        fontSize: '20px'
    }
}

export default styles;