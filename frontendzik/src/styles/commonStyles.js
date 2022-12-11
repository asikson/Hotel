import background from './background.jpg';
import { black, orange } from './constants';

const commonStyles = {
    page: {
        fontFamily: 'Times New Roman',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    },

    spaceEvenlycolumn: {
        display: 'flex',
        flexDirection: 'column',
        height: '95%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%'
    },

    centerColumn: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },

    OkButton: {
        borderRadius: '25px',
        width: '150px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: black,
        backgroundColor: orange,
        opacity: 1,
    },

    button: {
        borderRadius: '25px',
        width: '170px',
        height: '70px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: black,
        marginRight: '15px'
    },

    coloredButton: {
        borderRadius: '25px',
        width: '170px',
        height: '70px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: black,
        backgroundColor: orange,
        opacity: 1,
        marginRight: '15px'
    },

    label: {
        fontSize: '25px'
    },

    labelText: {
        fontSize: '20px'
    }
};

export default commonStyles;