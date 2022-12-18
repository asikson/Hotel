import styles from '../../generic/styles/listStyles';
import { Paper, TableBody, TableContainer, Table, TableHead, TableCell, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../generic/styles/styled';
import { checkReservation } from '../utils/calendarUtils';
import { black, white, orange } from '../../styles/constants';
import { useState } from 'react';
import ReservationDetailsDialog from '../../dialogs/components/ReservationsDetailsDialog';
import { addWeekDays } from '../utils/calendarUtils';

const CalendarListTable = ({columns, rooms, reservationData, idRoom, toggleKey}) => {

  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

    const createTableCell = (column) => <StyledTableCell>{column}</StyledTableCell>;
    
    const cellContent = (room, column) => {
        const dataForRoom = reservationData[room[idRoom]];

        if (dataForRoom) {  
            const checked = dataForRoom
              .filter(reservation => checkReservation(reservation, column));

            if (checked.length > 0) {
              return checked[0];
            }
        }

        return null;
    };

    const onButtonClick = (item) => {
      setCurrentItem(item);
      setDetailsDialogOpen(true);
    }

    return (
      <>
        <div style={styles.listWrapper}>
            <TableContainer component={Paper} sx={{maxWidth: '95%'}}>
              <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                <TableRow />
                  <TableRow>
                    <TableCell></TableCell>
                    {addWeekDays(columns).map(createTableCell)}
                  </TableRow>
                </TableHead>
        
                <TableBody>
                  {rooms.map((room) => (
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '120px'}}
                    >
                        <TableCell component="th" scope="row" sx={{backgroundColor: black, color: white}}>{room.name}</TableCell>
                        {columns.map(column => {
                          const item = cellContent(room, column);
                          const color = item ? orange : white;
                          return <TableCell sx={{backgroundColor: color}}>
                            {item && <button style={{width: '100%', height: '70px', opacity: 0}} onClick={() => onButtonClick(item)}></button>}
                          </TableCell>
                        })}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>

        <ReservationDetailsDialog 
          open={detailsDialogOpen}
          setOpen={setDetailsDialogOpen}
          item={currentItem}
          toggleKey={toggleKey}
        />
      </>
    )
}

export default CalendarListTable;