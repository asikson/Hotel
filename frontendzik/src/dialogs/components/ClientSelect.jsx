import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ClientSelect = ({clients, clientId, setClientId}) => {

    const createItem = (client) => {
        const label = `${client.name} ${client.surname}`;
        return <MenuItem value={client.id_client}>{label}</MenuItem>
    }

    return (
        <FormControl sx={{width: '220px'}}>
            <InputLabel color='warning'>Wybierz klienta</InputLabel>
            <Select
                value={clientId}
                label='Wybierz klienta'
                onChange={value => setClientId(value)}
                color='warning'
            >
                {clients.map(client => createItem(client))}
            </Select>
        </FormControl>
    )
};

export default ClientSelect;


