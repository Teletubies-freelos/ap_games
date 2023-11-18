import MaterialReactTable from 'material-react-table';
import { ListColumns } from './Columns';
import { useOrders } from '../../hooks/getOrders';
import { Box, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import UpdateOrderModal from '../../components/modals/UpdateOrderModal';
import { setIsOpenUpdateOrder } from '../../observables';
import { useState } from 'react';

const ListOrders = () => {
  const { data, isFetching } = useOrders();
  const list = ListColumns;
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>();
  return (
    <>
      <MaterialReactTable
        columns={list()}
        data={data ?? []}
        enableStickyHeader
        muiTableContainerProps={{
          sx: {
            maxHeight: '75vh',
          },
        }}
        state={{ isLoading: isFetching }}
        enableRowActions
        renderRowActions={({ row }) => (
          <Box display='flex'>
            <IconButton
              color='secondary'
              onClick={() => {
                setIsOpenUpdateOrder(true)
                setSelectedOrderId(row.original.order_id);
              }}
            >
              <Edit />
            </IconButton>
          </Box>
        )}
      />
      <UpdateOrderModal orderId={selectedOrderId} />
    </>
  );
};

export default ListOrders;
