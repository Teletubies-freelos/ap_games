import { Box, IconButton, Popover } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ReactNode, useMemo, useState } from 'react';

interface TooltipProps {
  renderedCellValue: ReactNode;
}

interface IOrderProduct {
  quantity: number;
  product: {
    name: string;
    price: number;
  };
}

const FieldTooltip = ({ renderedCellValue }: TooltipProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'orders-popover' : undefined;

  const PopoverMemo = useMemo(() => {
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {Array.isArray(renderedCellValue) ? (
          renderedCellValue.map((item: IOrderProduct) => (
            <Box key={item?.product?.name} padding='.5rem'>
              <Box>
                {item?.product?.name}{' '}
                {!!item?.quantity && ` x ${item?.quantity}`}
              </Box>
            </Box>
          ))
        ) : (
          <Box sx={{ width: '8rem', padding: '.5rem' }}>
            <Box>{renderedCellValue}</Box>
          </Box>
        )}
      </Popover>
    );
  }, [open, renderedCellValue]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <IconButton onClick={handleClick}>
        <VisibilityIcon />
      </IconButton>
      {PopoverMemo}
    </Box>
  );
};

export default FieldTooltip;
