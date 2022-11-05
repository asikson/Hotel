import background from '../images/background.jpg';

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
        height: '90%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    centerColumn: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default commonStyles;