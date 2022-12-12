import styles from '../../generic/styles/listStyles';
import { Paper, TableBody, TableContainer, Table, TableHead, TableCell, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../generic/styles/styled';


const CalendarListTable = ({items, labels}) => {

    const columns = items.length === 0 ? items : Object.keys(items[0]).filter(key => key in labels);

    const createTableCell = (column) => 
        <StyledTableCell>
            {(labels && labels[column]) || ''}
        </StyledTableCell>;

    return (
        <div style={styles.listWrapper}>
            <TableContainer component={Paper} sx={{maxWidth: '100%'}}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">

                <TableBody>
                  {items.map((item) => (
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                    >
                      <TableCell component="th" scope="row" >{item[columns[0]]}</TableCell>
                        {columns.slice(1).map(column => <TableCell >{item[column]}</TableCell>)}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
    )
}

export default CalendarListTable;