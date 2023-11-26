import { MRT_ColumnDef } from 'material-react-table';
import { DeliveryCostsTypes, IDeliveryCosts, deliveryCostsTypesText } from '../../../services/DeliveryCosts';

export function ListColumns(): MRT_ColumnDef<IDeliveryCosts>[] {
  return [
    {
      header: 'Nombre del costo de envío',
      accessorKey: 'type',
      Cell: ({ renderedCellValue }) => deliveryCostsTypesText[renderedCellValue as DeliveryCostsTypes],
      size: 50,
    },
    {
      header: 'Tipo',
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
