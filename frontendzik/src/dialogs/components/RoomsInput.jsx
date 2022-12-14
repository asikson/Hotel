import { TextField} from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from '../styles/addDialogStyles';
import { addItem, updateItem } from '../../utils/api';
import { getIdValue } from '../../utils/apiUtils';
import StandardDropdown from './StandardDropdown';
import { isEmpty } from '../../utils/apiUtils';

const RoomsInput = ({ setOpen, item, type, refresh }) => {

    const [name, setName] = useState('');
    const [numOfPeople, setNumOfPeople] = useState('');
    const [standard, setStandard] = useState(null);
    const [price, setPrice] = useState(null);
    const [cost, setCost] = useState(null);

    useEffect (() => {
        if (item) {
            setName(item.name);
            setNumOfPeople(item.number_of_people);
            setStandard(item.standard || null);
            setPrice(item.price || null);
            setCost(item.clean_cost || null);
        }
    }, [item]);

    const cleanUp = () => {
        setOpen(false);
        setName('');
        setNumOfPeople('');
        setStandard(null);
        setPrice(null);
        setCost(null);
        refresh();
    }

    const handleAdd = () => { 
        addItem(type, name, numOfPeople, standard, price, cost).then(_ => cleanUp())
    };

    const handleUpdate = () => {
        updateItem(type, getIdValue(type, item), name, numOfPeople, standard, price, cost).then(_ => cleanUp())
    };

    const addDisabled = [name, numOfPeople, standard, price, cost].some(isEmpty);

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
                ? <>
                    <TextField
                        style={styles.input} 
                        type={'number'} 
                        label={'Cena (PLN)'} 
                        color='warning' 
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <TextField
                        style={styles.input} 
                        type={'number'} 
                        label={'Koszt przygotowania (PLN)'} 
                        color='warning' 
                        value={cost}
                        onChange={e => setCost(e.target.value)}
                    />
                    <StandardDropdown
                        standard={standard}
                        setStandard={setStandard}
                    />
                </>
                
                : null
    
            }
            
            {item
                ? <button style={styles.button} onClick={handleUpdate} disabled={addDisabled}>Zapisz</button>
                : <button style={styles.button} onClick={handleAdd} disabled={addDisabled}>Dodaj</button>
            }
        </div>
    )
}

export default RoomsInput;