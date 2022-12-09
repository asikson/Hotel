import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from '../styles/addDialogStyles';
import { addItem, updateItem, idNames } from '../../utils/api';

const RoomsInput = ({ setOpen, item, type, refresh }) => {

    const [name, setName] = useState('');
    const [numOfPeople, setNumOfPeople] = useState('');
    const [standard, setStandard] = useState(null);

    useEffect (() => {
        if (item) {
            setName(item.name);
            setNumOfPeople(item.number_of_people);
            setStandard(item.standard || null);
        }
    }, [item]);

    const cleanUp = () => {
        setOpen(false);
        setName('');
        setNumOfPeople('');
        setStandard(null);
        refresh();
    }

    const handleAdd = () => { 
        addItem(type, name, numOfPeople, standard).then(_ => cleanUp())
    };

    const handleUpdate = () => {
        updateItem(type, item[idNames[type]], name, numOfPeople, standard).then(_ => cleanUp())
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
            {type === 'rooms/rooms'
                ? <TextField
                    style={styles.input} 
                    type={'number'} 
                    label={'Standard pokoju'} 
                    color='warning' 
                    value={standard}
                    onChange={e => setStandard(e.target.value)}
                />
                : null
            }
            
            {item
                ? <button style={styles.button} onClick={handleUpdate}>Zapisz</button>
                : <button style={styles.button} onClick={handleAdd}>Dodaj</button>
            }
        </div>
    )
}

export default RoomsInput;