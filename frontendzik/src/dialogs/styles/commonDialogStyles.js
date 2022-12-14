import { snowWhite, orange } from "../../styles/constants";

const commonDialogStyles = {
    dialog: {
        position: 'fixed',
        top: '10%',
        left: '30%',
        overflowY: 'auto',
        height: '80%', 
        width: '40%', 
        background: snowWhite, 
        borderRadius: '25px',
    },
    
    topBar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        height: '40px'
    },

    topLeft: {
        width: '70%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '20px'
    },

    topRight: {
        width: '30%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '20px'
    },

    basicColumn: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        width: '100%'
    },

    xButton: {
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '30px',
        background: orange
    },

    label: {
        fontSize: '35px'
    },

    xLabel: {
        fontSize: '20px'
    },

    labelText: {
        fontSize: '30px'
    }
}

export default commonDialogStyles;