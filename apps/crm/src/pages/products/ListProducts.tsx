import { MaterialReactTable } from 'material-react-table';
import { useGetProducts } from '../../hooks/getProducts';
import { Box, Button, IconButton, Stack } from '@mui/material';
import CreateModal from '../../components/modals/CreateModal';
import { ListColumns } from './config';
import { setIsOpenCreateProduct, setIsOpenUpdateProduct } from '../../observables';
import { Delete, Edit } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDeleteOne } from 'data_providers';
import { AsyncProviderNames } from '../../types/providers';
import { IProduct } from '../../services/Products';
import UpdateProductModal from '../../components/modals/UpdateProductModal';
import { useState } from 'react';

export const ListProducts = () => {
  const { data, setPage, pagination, isLoading } = useGetProducts();
  const [selectProductId, setSelectedProductId] = useState<number>();
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
              Agregar Producto
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
                setIsOpenUpdateProduct(true)
                setSelectedProductId(row.original.product_id);
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
      <UpdateProductModal productId={selectProductId}/>
    </Stack>
  );
};
