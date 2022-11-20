import { CircleSpinnerOverlay } from 'react-spinner-overlay';

const LoadingOverlay = ({loading}) => {
    return (
        <CircleSpinnerOverlay
          loading={loading} 
          overlayColor="rgba(0, 0, 0, 0.2)"
          color="rgba(0, 0, 0)"
        />
    );
}

export default LoadingOverlay;