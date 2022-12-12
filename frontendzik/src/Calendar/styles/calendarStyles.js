import { cardClasses, requirePropFactory } from "@mui/material";

const styles = {
    container: {
        height: '96%',
        width: '100%',
        margin: '20px'
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

    toggle: {
        height: '35px',
    },

    topBarReservation: {
        heigth: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        margin: '20px',
        alignItems: 'center',
        justifyContent: 'center'
    },

    topLeftReservation: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-start',
    },

    topRightReservation: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-start',
    },


    content: {
        height: '90%',
        border: '1px solid',
        margin: '20px',
    },

    calendarHead: {
        display: 'flex',
        justifyContent: 'space-around',
        fontSize: '25px',
        margin: '15px',

    },

    sevenColGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
    },

    headDay: {
        textAlign: 'center',
        fontSize: '20px',
        background: '#000000',
        color: 'white'
    },

    calendarBody: {
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        //gridTemplateRows: 'repeat(${({fourCol}) => (fourCol ? 4 : 5)}, 1fr)'
    },

    styledEvent: {
        display: 'grid',
        textAlign: 'center',
        background: 'blue',
        color: 'white',
        padding: '2px',
        borderRadius: '8px'
    },

    styledDay: {
        border: '2px solid',
    },

    styledWeek: {
        textAlign: 'center',
        fontSize: '20px',
        background: '#000000',
        color: 'white'
    },

    styledHeader: {
        fontSize: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '20',
        marginTop: '60px'
    },

    styledBodyList: {
        border: '2px solid',
        display: "grid", 
        //gridTemplateColumns: 'repeat(7, 1fr)',
        //gridTemplateRows: 'repeat(7, 1 fr)',
    },
    
}
export default styles;