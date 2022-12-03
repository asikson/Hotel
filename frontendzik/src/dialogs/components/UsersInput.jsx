import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from '../styles/addDialogStyles';
import { idNames, addUser } from '../../utils/api';

const UsersInput = ({ setOpen, item, type, refresh }) => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [priviliges, setPriviliges] = useState('');

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
        updateUser(item[idNames[type]], name, surname, priviliges).then(_ => cleanUp())
    }

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
            <TextField
                label='Uprawnienia' 
                type='number' 
                style={styles.input} 
                color='warning' 
                value={priviliges}
                onChange={e => setPriviliges(e.target.value)}
            />
            {item
                ? <button style={styles.button} onClick={handleUpdate}>Zapisz</button>
                : <button style={styles.button} onClick={handleAdd}>Dodaj</button>
            }
        </div>
    )
}

export default UsersInput;