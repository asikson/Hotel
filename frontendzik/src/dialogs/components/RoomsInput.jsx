import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from '../styles/addDialogStyles';
import { addItem, updateItem, idNames } from '../../utils/api';

const RoomsInput = ({ update, setOpen, item, type, refresh }) => {

    const [name, setName] = useState('');
    const [numOfPeople, setNumOfPeople] = useState('');

    useEffect (() => {
        if (item) {
            setName(item.name);
            setNumOfPeople(item.number_of_people);
        }
    }, [item]);

    const cleanUp = () => {
        setOpen(false);
        setName('');
        setNumOfPeople('');
        refresh();
    }

    const handleAdd = () => { 
        addItem(type, name, numOfPeople).then(_ => cleanUp())
    };

    const handleUpdate = () => {
        updateItem(type, item[idNames[type]], name, numOfPeople).then(_ => cleanUp())
    }

    return (
        <div style={styles.container}>
            <TextField
                label='Nazwa' 
                type='text' 
                style={styles.input} 
                color='warning' 
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <TextField
                style={styles.input} 
                type={'number'} 
                label={'Liczba osób'} 
                color='warning' 
                value={numOfPeople}
                onChange={e => setNumOfPeople(e.target.value)}
            />
            {update
                ? <button style={styles.button} onClick={handleUpdate}>Zapisz</button>
                : <button style={styles.button} onClick={handleAdd}>Dodaj</button>
            }
        </div>
    )
}

export default RoomsInput;