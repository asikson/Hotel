import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";

const ClientSelect = ({clients, clientId, setClientId}) => {

    const createItem = (client) => {
        const label = `${client.name} ${client.surname}`;
        return <MenuItem value={client.id_client}>{label}</MenuItem>
    }

    return (
        <FormControl sx={{width: '220px'}}>
            <FormLabel color='warning'>Wybierz klienta</FormLabel>
            <Select
                value={clientId}
                onChange={e => setClientId(e.target.value)}
                color='warning'
            >
                {clients.map(client => createItem(client))}
            </Select>
        </FormControl>
    )
};

export default ClientSelect;


