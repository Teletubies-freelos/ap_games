import { type MRT_ColumnDef } from 'material-react-table';
import { IProduct } from '../../services/Products';
import ImageInTable from '../../components/product/ImageInTable';
import FieldTooltip from '../../components/FieldTooltip';

export function ListColumns(): MRT_ColumnDef<IProduct>[] {
  return [
  {
    header: 'Id',
    accessorKey: 'product_id',
    size: 50
  },
  {
    header: 'Nombre',
    accessorKey: 'name',
    size: 50
  },
  {
    header: 'Descripcion',
    accessorKey: 'description',
    Cell : FieldTooltip,
    size: 50
  },
  {
    header: 'Precio',
    accessorKey: 'price',
    Cell : ({renderedCellValue}) => `S/. ${renderedCellValue}.00`,
    size: 50
  },
  {
    header: 'Precio Oferta',
    accessorKey: 'discount_price',
    Cell : ({renderedCellValue}) => `S/. ${renderedCellValue}.00`,
    size: 50
  },
  { header: 'Oferta',
    accessorKey: 'is_offer',
    Cell : ({renderedCellValue}) => renderedCellValue ? 'Si' : 'No',
    size: 50
  },
  { header: 'Visible',
    accessorKey: 'is_visible',
    Cell : ({renderedCellValue}) => renderedCellValue ? 'Si' : 'No',
    size: 50,
  },
  {
    header: 'Url de imagen',
    accessorKey: 'img_url',
    Cell : ImageInTable
  },
  { header: 'Url de imagen secundaria',
    accessorKey: 'secondary_url',
    Cell: ImageInTable
  },
  { header: 'Url de imagen de banner',
    accessorKey: 'banner_img_url',
    Cell: ImageInTable
  },
  {
    header: 'Cantidad',
    accessorKey: 'quantity'
  },
  {
    header: 'Categoria',
    accessorKey: 'category_id'
  }
] 
}
