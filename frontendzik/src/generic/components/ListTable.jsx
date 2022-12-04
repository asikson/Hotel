import styles from '../styles/listStyles';
import ListButton from './ListButton';
import { Paper, TableBody, TableContainer, Table, TableHead, TableCell, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styles/styled';
import { idNames } from '../../utils/api';

const ListTable = ({items, labels, admin, onDetailsButtonClick, onUpdateButtonClick, onDeleteButtonClick}) => {

    const columns = items.length === 0 ? items : Object.keys(items[0]).filter(key => key in labels);

    const createTableCell = (column) => 
        <StyledTableCell>
            {(labels && labels[column]) || ''}
        </StyledTableCell>;

    return (
        <div style={styles.listWrapper}>
            <TableContainer component={Paper} sx={{maxWidth: '95%'}}>
              <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {columns.map(createTableCell)}
                    <StyledTableCell />
                    {admin && 
                      <>
                        <StyledTableCell />
                        <StyledTableCell />
                      </>
                    }
                  </TableRow>
                </TableHead>
        
                <TableBody>
                  {items.map((item) => (
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                    >
                      <TableCell component="th" scope="row" >{item[columns[0]]}</TableCell>
                        {columns.slice(1).map(column => <TableCell >{item[column]}</TableCell>)}
                      <TableCell>
                        <ListButton onClick={onDetailsButtonClick} item={item} label='Szczegóły'/>
                      </TableCell>
                      {admin &&
                        <>
                          <TableCell>
                            <ListButton onClick={onUpdateButtonClick} item={item} label='Edytuj'/>
                          </TableCell>
                          <TableCell>
                            <ListButton onClick={onDeleteButtonClick} item={item} label='Usuń'/>
                          </TableCell>
                        </>
                      }
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
    )
}

export default ListTable;