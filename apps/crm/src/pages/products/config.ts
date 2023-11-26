import { type MRT_ColumnDef } from 'material-react-table';
import { IProduct } from '../../services/Products';
import ImageInTable from '../../components/product/ImageInTable';
import FieldTooltip from '../../components/FieldTooltip';
import { parsedDate } from '../../utils';

export function ListColumns(): MRT_ColumnDef<IProduct>[] {
  return [
    {
      header: 'Nombre',
      accessorKey: 'name',
      size: 50,
    },
    {
      header: 'Descripcion',
      accessorKey: 'description',
      Cell: FieldTooltip,
      size: 50,
    },
    {
      header: 'Precio',
      accessorKey: 'price',
      Cell: ({ renderedCellValue }) => `S/. ${renderedCellValue}.00`,
      size: 50,
    },
    {
      header: 'Precio Oferta',
      accessorKey: 'discount_price',
      Cell: ({ renderedCellValue }) => `S/. ${renderedCellValue}.00`,
      size: 50,
    },
    {
      header: 'Visible',
      accessorKey: 'is_visible',
      Cell: ({ renderedCellValue }) => (renderedCellValue ? 'Si' : 'No'),
      size: 50,
    },
    {
      header: 'Imagen',
      accessorKey: 'img_url',
      Cell: ImageInTable,
    },
    {
      header: 'Imagen secundaria',
      accessorKey: 'secondary_url',
      Cell: ImageInTable,
    },
    {
      header: 'Imagen de banner',
      accessorKey: 'banner_img_url',
      Cell: ImageInTable,
    },
    {
      header: 'Categoría',
      accessorKey: 'category.name',
    },
    {
      header: 'Fecha de actualización',
      accessorKey: 'updated_at',
      Cell: ({ renderedCellValue }) => parsedDate(renderedCellValue as string),
      size: 50,
    },
  ];
}
