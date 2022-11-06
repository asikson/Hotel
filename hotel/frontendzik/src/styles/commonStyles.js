import background from './background.jpg';

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
        width: "100vw",
        height: "100vh",
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
        color: '#000000',
    },

    button: {
        borderRadius: '25px',
        width: '170px',
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000000',
        marginRight: '15px'
    }
};

export default commonStyles;