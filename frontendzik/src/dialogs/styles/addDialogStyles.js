import { black, snowWhite } from "../../styles/constants";

const styles = {
    input: {
        backgroundColor: snowWhite,
        width: '220px',
        height: '60px',
        marginBottom: '20px',
    },
    button: {
        borderRadius: '25px',
        width: '100px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: black,
        margin: '15px'
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '30px'
    }
}

export default styles;