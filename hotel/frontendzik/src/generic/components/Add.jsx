import React, {NumberField} from 'react';
import Input from '../../Login/components/Input';
import styles from '../styles/addStyles';
import commonStyles from '../../styles/commonStyles';
import { TextField } from '@mui/material';

const Add = ({type, handleAdd}) =>{

    const renderContent = () => {
        switch (type) {
            case 'room':
                return <>
                    <Input label={'Nazwa pokoju'} />
                    <TextField style={styles.input} type={'number'} label={'Liczba osób'} />
                </>
            default:
                null;
        }
    }

    return (
        <div style={commonStyles.centerColumn} >
            {renderContent()}
            <button style={commonStyles.button} > Dodaj </button>
        </div>
    );
};

export default Add;