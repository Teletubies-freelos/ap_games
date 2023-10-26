import { MaterialReactTable } from 'material-react-table';
import { useGetProducts } from '../../hooks/getProducts';
import { Box, Button, IconButton, Stack } from '@mui/material';
import CreateModal from '../../components/modals/CreateModal';
import { ListColumns } from './config';
import { setIsOpenCreateProduct } from '../../observables';
import { Delete, Edit } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDeleteOne } from 'data_providers';
import { AsyncProviderNames } from '../../types/providers';
import { IProduct } from '../../services/Products';

export const ListProducts = () => {
  const { data, setPage, pagination, isLoading } = useGetProducts();

  const list = ListColumns;
  const queryClient = useQueryClient();

  const deleteProduct = useDeleteOne(AsyncProviderNames.PRODUCTS);
  const { mutate } = useMutation(
    ['delete_product'],
    async (product_id: number) => {
      deleteProduct(product_id);
    },
    {
      onSuccess: (_data, variables) => {
        queryClient.setQueryData<IProduct[]>(
          ['all_products_table'],
          (prevProducts) =>
            prevProducts?.filter((product) => product.product_id !== variables)
        );
      },
    }
  );

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
            <Button
              onClick={() => setIsOpenCreateProduct(true)}
              variant='contained'
            >
              Add Product
            </Button>
            <CreateModal />
          </>
        )}
        enableRowActions
        renderRowActions={({ row }) => (
          <Box display='flex'>
            <IconButton
              color='secondary'
              onClick={() => {
                console.log(
                  '%c row.original :',
                  'background-color:#048A81',
                  row.original
                );
              }}
            >
              <Edit />
            </IconButton>
            <IconButton onClick={() => mutate(row.original.product_id)}>
              <Delete color='error' />
            </IconButton>
          </Box>
        )}
        data={data ?? []}
        state={{
          pagination,
          isLoading: isLoading,
        }}
      />
    </Stack>
  );
};
