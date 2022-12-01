const commonDialogStyles = {
    dialog: {
        position: 'fixed',
        top: '25%',
        left: '35%',
        overflowY: 'auto',
        height: '70%', 
        width: '30%', 
        background: '#ffffff', 
        borderRadius: '25px',
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
        padding: '20px'
    },
    topRight: {
        width: '50%',
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
        borderRadius: '30px'
    },
    label: {
        fontSize: '30px'
    }
}

export default commonDialogStyles;