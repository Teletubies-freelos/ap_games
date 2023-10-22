import { type MRT_ColumnDef } from 'material-react-table';
import TooltipOrders from '../../components/orders/TooltipOrders';

export function ListColumns(): MRT_ColumnDef[] {
  return [
    {
      header: 'Id',
      accessorKey: 'order_id',
      size: 50,
    },
    {
      header: 'Productos',
      accessorKey: 'products',
      size: 50,
      Cell: TooltipOrders,
    },
    {
      header: 'Nombre del cliente',
      accessorKey: 'client_name',
    },
    {
      header: 'Direccion',
      accessorKey: 'address',
      size: 200,
    },
    {
      header: 'Telefono',
      accessorKey: 'phone',
      size: 100,
    },
    {
      header: 'Total',
      accessorKey: 'total',
      size: 100,
    },
    {
      header: 'Metodo de pago',
      accessorKey: 'payment_method',
      size: 100,
    },
    {
      header: 'Estado de Pago',
      accessorKey: 'payment_state',
      size: 100,
    },
    {
      header: 'Codigo de Pago',
      accessorKey: 'code',
      size: 100,
    },
    {
      header: 'Fecha',
      accessorKey: 'create_date',
      size: 100,
    },
  ];
}
