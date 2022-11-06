import styles from '../styles/inputStyles';
import commonStyles from '../../styles/commonStyles';
import {TextField} from '@mui/material';

const Input = ({label, value, setValue, ifPassword=false}) => {
    const handleChange = e => {
        setValue(e.target.value);
    };

    const type = ifPassword ? 'password' : 'text';

    return (
        <div style={commonStyles.centerColumn}>
            <TextField
                label={label}
                style={styles.input}
                type={type}
                value={value}
                onChange={handleChange}
                variant='filled'
                color='warning'
            />
        </div>
    )
};

export default Input;