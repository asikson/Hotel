import React from 'react';
import { roomStandards } from '../../utils/constants';
import GenericSelect from './GenericSelect';
import { MenuItem } from '@mui/material';

const StandardDropdown = ({standard, setStandard}) => {

    const createStandardItem = (standard) => {
        return <MenuItem value={standard.id}>{standard.name}</MenuItem>
    };


    return (
        <GenericSelect
            items={roomStandards}
            itemId={standard}
            label={'standard pokoju'} 
            setItemId={setStandard}
            createItem={createStandardItem}
        />
    )
};

export default StandardDropdown;