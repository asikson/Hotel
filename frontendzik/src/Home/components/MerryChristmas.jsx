import betoniarka from '../../styles/betoniarka.jpg'

const styles = {
    fontFamily: 'Times New Roman',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
    paddingTop: '15px',
    fontSize: '80px',
    backgroundImage: `url(${betoniarka})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "55%",
    height: "95%",
}

const MerryChristmas = () => {
    return <div style={styles}></div>
}

export default MerryChristmas;