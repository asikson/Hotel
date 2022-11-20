import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from '../styles/addDialogStyles';
import { addItem, updateItem, idNames } from '../../utils/api';

const RoomsInput = ({ update, setOpen, item, type, refresh }) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [numOfPeople, setNumOfPeople] = useState('');

    useEffect (() => {
        if (item) {
            setId(item[idNames[type]]);
            setName(item.name);
            setNumOfPeople(item.number_of_people);
        }
    }, [item]);

    const cleanUp = () => {
        setOpen(false);
            setId('');
            setName('');
            setNumOfPeople('');
            refresh();
    }

    const handleAdd = () => { 
        addItem(type, id, name, numOfPeople).then(_ => cleanUp())
    };

    const handleUpdate = () => {
        updateItem(type, id, name, numOfPeople).then(_ => cleanUp())
    }

    return (
        <div style={styles.container}>
            <TextField
                style={styles.input} 
                type={'number'} 
                label={'Id'} 
                color='warning' 
                value={id}
                onChange={e => setId(e.target.value)}
            />
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