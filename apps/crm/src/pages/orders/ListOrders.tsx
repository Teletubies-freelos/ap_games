import MaterialReactTable from 'material-react-table';
import { ListColumns } from './Columns';
import { useOrders } from '../../hooks/getOrders';

const ListOrders = () => {
  const { data, isFetching } = useOrders();
  const list = ListColumns;

  return (
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
    />
  );
};

export default ListOrders;
