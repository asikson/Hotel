import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";

const emptyItem = <MenuItem value={'empty'}>Brak elementów</MenuItem>;

const GenericSelect = ({items, itemId, setItemId, createItem, label}) => {

    return (
        <FormControl sx={{width: '220px'}}>
            <FormLabel color='warning'>{`Wybierz ${label}`}</FormLabel>
            <Select
                value={itemId}
                onChange={e => setItemId(e.target.value)}
                color='warning'
            >
                {items.length === 0
                    ? emptyItem
                    : items.map(item => createItem(item))
                }
            </Select>
        </FormControl>
    )
};

export default GenericSelect;
