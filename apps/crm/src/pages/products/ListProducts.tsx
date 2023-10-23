import { MaterialReactTable } from 'material-react-table';
import { useGetProducts } from '../../hooks/getProducts';
import { Box, Button, IconButton, Stack } from '@mui/material';
import CreateModal from '../../components/modals/CreateModal';
import { ListColumns } from './config';
import { setIsOpenCreateProduct } from '../../observables';
import { Delete, Edit } from '@mui/icons-material';

export const ListProducts = () => {
  const { data, setPage, pagination,isFetching } = useGetProducts();
  
  const list = ListColumns;

  return (
    <Stack gap={'1rem'}>
      <MaterialReactTable
        enableStickyHeader
        manualExpanding={true}
        muiTableContainerProps={{
          sx: {
            maxHeight: '80vh',
          },
        }}
        columns={list()}
        onPaginationChange={setPage}
        renderTopToolbarCustomActions={() => (
          <>
            <Button onClick={() => setIsOpenCreateProduct(true)} variant='contained'>
              Add Product
            </Button>
            <CreateModal />
          </>
        )}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            
            <IconButton
              color="secondary"
              onClick={() => {
                table.setEditingRow(row);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                console.log('hola')
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        )}
        data={data ?? []}
        state={{
          pagination,
          isLoading: isFetching 
        }}

      />
    </Stack>
  );
};
