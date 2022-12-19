import { black } from "../../styles/constants";

const styles = {
    listWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        width: '100%',
        height: '80%',
        overflowY: 'scroll',
        marginTop: '15px'
    },

    listButton: {
        borderRadius: '25px',
        width: '90px',
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: black,
        marginRight: '15px'
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
        paddingLeft: '3%'
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

    container: {
        width: '100%',
        height: '100%',
        marginTop: '20px'
    }
}

export default styles;