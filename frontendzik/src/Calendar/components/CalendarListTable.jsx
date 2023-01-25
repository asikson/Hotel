import styles from '../../generic/styles/listStyles';
import { Paper, TableBody, TableContainer, Table, TableHead, TableCell, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../generic/styles/styled';
import { black, white, orange } from '../../styles/constants';
import { useState } from 'react';
import ReservationDetailsDialog from '../../dialogs/components/ReservationsDetailsDialog';
import { addWeekDays } from '../utils/calendarUtils';
import { getReservationById } from '../../utils/api';

const CalendarListTable = ({columns, rooms, reservationData, idRoom, toggleKey}) => {

  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

    const createTableCell = (column) => <StyledTableCell key={column}>{column}</StyledTableCell>;
    
    const cellContent = (room, column) => {
        const dataForRoom = reservationData[room[idRoom]];

        if (dataForRoom && dataForRoom[column]) {  
          return dataForRoom[column];
        }

        return null;
    };

    const onButtonClick = (item) => {
      getReservationById(item, toggleKey).then(response => {
        setCurrentItem(response.data[0]);
        setDetailsDialogOpen(true);
      })
    }

    return (
      <>
        <div style={styles.listWrapper}>
            <TableContainer component={Paper} sx={{maxWidth: '95%'}}>
              <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead sx={{position: 'sticky'}}>
                  <TableRow key='left-corner'/>
                  <TableRow key='top'>
                    <TableCell key='left-corner-cell'></TableCell>
                    {addWeekDays(columns).map(createTableCell)}
                  </TableRow>
                </TableHead>
        
                <TableBody>
                  {rooms.map((room) => (
                    <StyledTableRow
                      key={room.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '120px'}}
                    >
                        <TableCell component="th" scope="row" sx={{backgroundColor: black, color: white}} key={room.name}>{room.name}</TableCell>
                        {columns.map(column => {
                          const item = cellContent(room, column);
                          const color = item ? orange : white;
                          return <TableCell sx={{backgroundColor: color}} key={`${room.name}-${column}`}>
                            {item && 
                              <button 
                                style={{width: '100%', height: '70px', opacity: 0}} 
                                onClick={() => onButtonClick(item)} 
                                data-testid={`${room.name}-${column}`}
                              />
                            }
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