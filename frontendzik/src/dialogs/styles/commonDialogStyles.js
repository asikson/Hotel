const commonDialogStyles = {
    dialog: {
        position: 'fixed',
        top: '25%',
        left: '35%',
        overflowY: 'auto',
        height: '40%', 
        width: '30%', 
        background: '#ffffff', 
    },
    topBar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        height: '40px'
    },
    topLeft: {
        width: '50%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '10px'
    },
    topRight: {
        width: '50%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px'
    },
    basicColumn: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        width: '100%'
    },
    xButton: {
        width: '35px',
        height: '35px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '30px'
    },
    label: {
        fontSize: '25px'
    }
}

export default commonDialogStyles;