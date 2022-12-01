import React, {useState, useEffect} from 'react';
import styles from '../styles/listStyles';
import { getItems } from '../../utils/api';
import { getLabels } from '../../utils/constants';
import LoadingOverlay from './LoadingOverlay';
import DetailsDialog from '../../dialogs/components/DetailsDialog';
import AddDialog from '../../dialogs/components/AddDialog';
import DeleteDialog from '../../dialogs/components/DeleteDialog';
import ListTable from './ListTable';
import TopBar from './TopBar';

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


  return (
    <div style={styles.container}>
      {loading
        ? <LoadingOverlay loading={loading} />
        : <>
          {admin 
            && <TopBar 
              styles={styles} 
              onAddButtonClick={onAddButtonClick} 
              onGoBackButtonClick={onGoBackButtonClick}
              />
          }
          <ListTable
            items={items} 
            labels={labels}
            admin={admin}
            onDetailsButtonClick={onDetailsButtonClick}
            onUpdateButtonClick={onUpdateButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          /> 
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