import { FormControl, FormLabel, Select } from "@mui/material";
import { getItems } from "../../utils/api";

const GenericSelect = ({items, itemId, setItemId, createItem, label}) => {

    return (
        <FormControl sx={{width: '220px'}}>
            <FormLabel color='warning'>{`Wybierz ${label}`}</FormLabel>
            <Select
                value={itemId}
                onChange={e => setItemId(e.target.value)}
                color='warning'
            >
                {items.map(item => createItem(getItems))}
            </Select>
        </FormControl>
    )
};

export default GenericSelect;
