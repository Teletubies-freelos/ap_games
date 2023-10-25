import { type MRT_ColumnDef } from 'material-react-table';
import { parsedDate } from '../../utils';
import { isEmpty } from '../../utils/index';
import FieldTooltip from '../../components/FieldTooltip';
import { IOrders } from '../../services/Orders';

export function ListColumns(): MRT_ColumnDef<IOrders>[] {
  return [
    {
      header: 'Productos',
      accessorKey: 'order_products',
      size: 50,
      Cell: FieldTooltip,
    },
    {
      header: 'Número de pedido',
      accessorKey: 'order_id',
      size: 100,
    },
    {
      header: 'Fecha',
      accessorKey: 'created_at',
      Cell: ({ renderedCellValue }) => parsedDate(renderedCellValue as string),
      size: 100,
    },
    {
      header: 'Nombre del cliente',
      accessorKey: 'client_name',
      Cell: ({ renderedCellValue }) => isEmpty(renderedCellValue),
    },
    {
      header: 'Dirección',
      accessorKey: 'address',
      size: 200,
      Cell: ({ renderedCellValue }) => isEmpty(renderedCellValue),
    },
    {
      header: 'Telefono',
      accessorKey: 'phone',
      size: 100,
      Cell: ({ renderedCellValue }) => isEmpty(renderedCellValue),
    },
    {
      header: 'Total',
      accessorKey: 'total',
      size: 100,
      Cell: ({ renderedCellValue }) => isEmpty(renderedCellValue),
    },
    {
      header: 'Metodo de pago',
      accessorKey: 'payment_method.name',
      size: 100,
      Cell: ({ renderedCellValue }) => isEmpty(renderedCellValue),
    },
    {
      header: 'Estado de Pago',
      accessorKey: 'order_status.name',
      size: 100,
      Cell: ({ renderedCellValue }) => isEmpty(renderedCellValue),
    },
  ];
}
