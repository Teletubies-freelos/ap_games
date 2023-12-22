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
      header: 'Fecha',
      accessorKey: 'created_at',
      Cell: ({ renderedCellValue }) => parsedDate(renderedCellValue as string),
      size: 100,
    },
    {
      header: 'Tipo de entrega',
      accessorKey: 'delivery_way.name',
      Cell: ({ renderedCellValue }) => isEmpty(renderedCellValue),
    },
    {
      header: 'Nombre del cliente',
      accessorKey: 'client_name',
      Cell: ({ renderedCellValue }) => isEmpty(renderedCellValue),
    },
    {
      header: 'Teléfono',
      accessorKey: 'phone',
      size: 100,
      Cell: ({ renderedCellValue }) => isEmpty(renderedCellValue),
    },
    {
      header: 'Dirección',
      accessorKey: 'address',
      size: 200,
      Cell: ({ renderedCellValue }) => isEmpty(renderedCellValue),
    },
    {
      header: 'Precio Delivery',
      accessorKey: 'delivery_price',
      size: 100,
      Cell: ({ renderedCellValue }) => (renderedCellValue ? "S/. " + renderedCellValue : "No Aplica"),
    },
    {
      header: 'Total',
      accessorKey: 'total',
      size: 100,
      Cell: ({ renderedCellValue }) => renderedCellValue ? "S/. " + renderedCellValue : isEmpty(renderedCellValue),
    },
    {
      header: 'Método de pago',
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
    {
      header: 'Fecha de creación',
      accessorKey: 'created_at',
      Cell: ({ renderedCellValue }) => parsedDate(renderedCellValue as string),
      size: 50,
    },
  ];
}
