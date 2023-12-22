import MaterialReactTable from 'material-react-table';
import { ICategory, ListColumns } from './Columns';
import { Box, Button, IconButton, } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useQueryCategory } from '../../hooks/useQueryCategory';
import { ModalState, setModalState } from '../../observables';
import { useState } from 'react';
import DeleteConfirmationDialog from '../../components/modals/DeleteConfirmationDialog';

export interface ICategoryName {
  name: string;
}

const ListCategories = () => {
  const list = ListColumns;

  const { reset } = useForm<ICategory>();
  const { data, isFetching, mutateDelete, } = useQueryCategory({ reset });

  const [dialogState, setDialogState] = useState({
    data: { name: null, meta: null },
    deleteDialogOpen: false,
    deleteItemData: null,
  });

  const handleDelete = () => {
    // @ts-ignore
    mutateDelete(dialogState.deleteItemData)

    setDialogState((prevState) => ({
      ...prevState,
      deleteDialogOpen: false,
      deleteItemData: null,
    }));
  };

  return (
    <Box sx={{ padding: '1rem' }}>
      <Button sx={{ margin: '1rem' }} variant="contained" onClick={() => setModalState({ data: { name: ModalState.CATEGORY_DETAIL_CREATE } })}>Agregar categoria</Button>
      <MaterialReactTable
        columns={list()}
        // @ts-ignore
        data={data ?? []}
        enableStickyHeader
        muiTableContainerProps={{
          sx: {
            maxHeight: '75vh',
          },
        }}
        enableRowActions
        renderRowActions={({ row }) => (
          <Box display='flex'>
            <IconButton
              color='secondary'
              onClick={() => {
                // setValue('name', row.original.name);
                // if (nameFieldRef.current) {
                //   nameFieldRef.current.focus();
                //   setIsEditCategory(true);
                //   setEditId(row.original.category_id);
                // }
                setModalState({
                  data: {
                    name: ModalState.CATEGORY_DETAIL_UPDATE,
                    meta: data?.find(x => x.category_id == row.original.category_id)
                  }
                })
              }}
            >
              <Edit />
            </IconButton>
            <IconButton onClick={() => {
              setDialogState({
                deleteDialogOpen: true,
                // @ts-ignore
                deleteItemData: { category_id: row.original.category_id, sub_categories: row.original.sub_categories },
              })
              // mutateDelete()
            }}>
              <Delete color='error' />
            </IconButton>
          </Box>
        )}
        state={{ isLoading: isFetching }}
      />
      <DeleteConfirmationDialog
        open={dialogState.deleteDialogOpen}
        onClose={() =>
          setDialogState((prevState) => ({
            ...prevState,
            deleteDialogOpen: false,
          }))
        }
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default ListCategories;
