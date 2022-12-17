import styles from '../../generic/styles/listStyles';
import { Paper, TableBody, TableContainer, Table, TableHead, TableCell, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../generic/styles/styled';
import { checkIfDateBetween, checkReservation } from '../utils/calendarUtils';


const CalendarListTable = ({columns, rooms, reservationData, idName}) => {

    const createTableCell = (column) => <StyledTableCell>{column}</StyledTableCell>;
    
    const cellContent = (room, column) => {
        const dataForRoom = reservationData[room[idName]];

        if (dataForRoom) {  
            const checked = dataForRoom
              .filter(reservation => checkReservation(reservation, column));

            if (checked.length > 0) {
              return checked[0].clientId;
            }
        }

        return '';
    };

    return (
        <div style={styles.listWrapper}>
            <TableContainer component={Paper} sx={{maxWidth: '95%'}}>
              <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                <TableRow />
                  <TableRow>
                    <TableCell></TableCell>
                    {columns.map(createTableCell)}
                  </TableRow>
                </TableHead>
        
                <TableBody>
                  {rooms.map((room) => (
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                    >
                        <TableCell component="th" scope="row" >{room.name}</TableCell>
                        {columns.map(column => <TableCell >{cellContent(room, column)}</TableCell>)}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
    )
}

export default CalendarListTable;