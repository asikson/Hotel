import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from '../styles/addDialogStyles';
import { addUser } from '../../utils/api';
import { getIdValue, isEmpty } from '../../utils/apiUtils';

const UsersInput = ({ setOpen, item, type, refresh }) => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [priviliges, setPriviliges] = useState(false);

    useEffect (() => {
        if (item) {
            setName(item.name);
            setSurname(item.surname);
            setPriviliges(item.priviliges);
        }
    }, [item]);

    const cleanUp = () => {
        setOpen(false);
        setName('');
        setSurname('');
        setPriviliges('');
        refresh();
    }

    const handleAdd = () => { 
        addUser(name, surname, priviliges).then(_ => cleanUp());
    };

    const handleUpdate = () => {
        updateUser(getIdValue(type, item), name, surname, priviliges).then(_ => cleanUp())
    };

    const addDisabled = isEmpty(name) || isEmpty(surname);

    return (
        <div style={styles.container}>
            <TextField
                label='Imię' 
                type='text' 
                style={styles.input} 
                color='warning' 
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <TextField
                label='Nazwisko' 
                type='text' 
                style={styles.input} 
                color='warning' 
                value={surname}
                onChange={e => setSurname(e.target.value)}
            />
            <FormControlLabel 
                style={styles.checkbox}
                label='Administrator' 
                control={
                    <Checkbox
                        value={priviliges}
                        onChange={e => setPriviliges(e.target.checked)}
                        sx={{color: 'orange', '&.Mui-checked': {
                            color: 'orange',
                        }}}
                    />
                }
            />
            {item
                ? <button style={styles.button} onClick={handleUpdate} disabled={addDisabled}>Zapisz</button>
                : <button style={styles.button} onClick={handleAdd} disabled={addDisabled}>Dodaj</button>
            }
        </div>
    )
}

export default UsersInput;