import { MRT_ColumnDef } from 'material-react-table';
import { DeliveryCostsTypes, IDeliveryCosts, deliveryCostsTypesText } from '../../../services/DeliveryCosts';

export function ListColumns(): MRT_ColumnDef<IDeliveryCosts>[] {
  return [
    {
      header: 'Id',
      accessorKey: 'delivery_costs_id',
      size: 100,
    },
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
  ];
}
