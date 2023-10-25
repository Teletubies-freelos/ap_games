import { MRT_Column } from 'material-react-table';
import { ReactNode } from 'react';
import { IProduct } from '../../services/Products';

interface ImageInTableProps {
  renderedCellValue: ReactNode;
  column: MRT_Column<IProduct>;
}

const ImageInTable = ({ renderedCellValue, column }: ImageInTableProps) => {
  const { id } = column;
  const BANNER_IMG = 'banner_img_url';
  const width = id === BANNER_IMG ? '120px' : '80px';
  return renderedCellValue ? (
    <img style={{ height: '80px', width }} src={renderedCellValue as string} />
  ) : (
    'No'
  );
};
export default ImageInTable;
