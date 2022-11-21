import React, {useState, useEffect} from 'react';
import { Paper, TableBody, TableContainer, Table, TableHead, TableCell, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styles/styled';
import styles from '../styles/listStyles';
import { getItems } from '../../utils/api';
import { getLabels } from '../../utils/constants';
import LoadingOverlay from './LoadingOverlay';
import DetailsDialog from '../../dialogs/components/DetailsDialog';
import ListButton from './ListButton';
import AddDialog from '../../dialogs/components/AddDialog';
import DeleteDialog from '../../dialogs/components/DeleteDialog';

const GenericList = ({pageKey, admin, goBack}) => {

  const [items, setItems] = useState([]);
  const [labels, setLabels] = useState({});
  const [loading, setLoading] = useState(true);
  const [openDetailsDialog, setDetailsDialogOpen] = useState(false);
  const [openAddDialog, setAddDialogOpen] = useState(false);
  const [openUpdateDialog, setUpdateDialogOpen] = useState(false);
  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);

  const [currentItem, setCurrentItem] = useState({});

  const updateLabels = () => {
    const newLabels = getLabels(pageKey);
    setLabels(newLabels);
  };

  const onDetailsButtonClick = (item) => {
    setCurrentItem(item);
    setDetailsDialogOpen(true);

  };

  const onAddButtonClick = () => {
    setAddDialogOpen(true);
  };

  const onUpdateButtonClick = (item) => {
    setCurrentItem(item);
    setUpdateDialogOpen(true);
  };

  const onDeleteButtonClick = (item) => {
    setCurrentItem(item);
    setDeleteDialogOpen(true);
  };

  const onGoBackButtonClick = () => {
    goBack('adminPanel');
  }

  const refresh = () => {

    setLoading(true);
    setItems([]);
    updateLabels();
    getItems(pageKey).then(response => {
      setItems(response);
      setLoading(false);
    });
  };

  useEffect(() => {
    refresh();

  }, [pageKey]);

  const columns = items.length === 0 ? items : Object.keys(items[0]);

  const createTableCell = (column) => <StyledTableCell>{(labels && labels[column]) || ''}</StyledTableCell>;

  return (
    <div style={styles.container}>
      {loading
        ? <LoadingOverlay laoding={loading} />
        : <>
          {admin && <div style={styles.topBar}>
            <div style={styles.topLeft}>
              <button style={styles.addButton} onClick={onGoBackButtonClick}>Wróć</button>
            </div>
            <div style={styles.topRight}>
              <button style={styles.addButton} onClick={onAddButtonClick}>Dodaj</button>
            </div>
          </div>
          }
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
        </>
    }
    <DetailsDialog open={openDetailsDialog} setOpen={setDetailsDialogOpen} item={currentItem}/>

    <AddDialog open={openAddDialog} setOpen={setAddDialogOpen} type={pageKey} refresh={refresh} update={false} />
    <AddDialog open={openUpdateDialog} setOpen={setUpdateDialogOpen} type={pageKey} refresh={refresh} update={true} item={currentItem} />
    <DeleteDialog open={openDeleteDialog} setOpen={setDeleteDialogOpen} type={pageKey} refresh={refresh} item={currentItem} />

    </div>
  );
};

export default GenericList;