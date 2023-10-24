import { MRT_ColumnDef } from 'material-react-table';

export interface ICategory {
  category_id: number;
  name: string;
}

export function ListColumns(): MRT_ColumnDef<ICategory>[] {
  return [
    {
      header: 'Id',
      accessorKey: 'category_id',
      size: 100,
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
      size: 50,
    },
  ];
}
