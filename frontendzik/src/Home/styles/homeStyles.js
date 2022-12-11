import { white } from "../../styles/constants";

const styles = {
    content: {
        borderRadius: '25px',
        width: '95vw',
        height: '80vh',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        opacity: 0.75,
        backgroundColor: white,
    },

    buttonsLayout: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: '65%'
    },
    
    navigationBar: {
        borderRadius: '25px',
        width: '95vw',
        height: '100px',
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '15px',
        paddingRight: '15px',
        alignItems: 'center',
        opacity: 0.75,
        backgroundColor: white,
    },
}

export default styles;