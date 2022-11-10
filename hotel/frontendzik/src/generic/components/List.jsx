import { Paper, TableBody, TableContainer, Table, TableHead, TableCell, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styles/styled';
import styles from '../styles/listStyles';

const items = [
    { name: 'Yellow', people: 4, floor: 4 },
    { name: 'Green', people: 6, floor: 2 }
];

const labels = {
    name: 'Nazwa',
    people: 'Liczba miejsc',
    floor: 'Piętro'
};

const listButton = <button style={styles.listButton}>OK</button>;

const createTableCell = (column) => <StyledTableCell>{labels[column]}</StyledTableCell>;

const GenericList = () => {

    const columns = Object.keys(items[0]);

    return (
        <div style={styles.listWrapper}>
            <TableContainer  component={Paper} sx={{maxWidth: '95%'}}>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                    {columns.map(createTableCell)}
                    <StyledTableCell />
                </TableRow>
            </TableHead>
        
        <TableBody>
          {items.map((item) => (
            <StyledTableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
                <TableCell component="th" scope="row" >{item[columns[0]]}</TableCell>
                {columns.slice(1).map(column => <TableCell >{item[column]}</TableCell>)}
                <TableCell>{listButton}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
  );
};

export default GenericList;