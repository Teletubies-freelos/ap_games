import { MRT_ColumnDef } from 'material-react-table';
import { IDeliveryCosts,  } from '../../../services/DeliveryCosts';

export function ListColumns(): MRT_ColumnDef<IDeliveryCosts>[] {
  return [
    {
      header: 'Nombre del costo de envío',
      accessorKey: 'description',
      size: 50,
    },
    {
      header: 'Precio',
      accessorKey: 'price',
      Cell: ({ renderedCellValue }) => 'S/ ' + renderedCellValue,
      size: 50,
    },
  ];
}
