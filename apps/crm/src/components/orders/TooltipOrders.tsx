import { Box, IconButton, Popover, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ReactNode, useMemo, useState } from 'react';

interface TooltipProps {
  renderedCellValue: ReactNode | undefined;
}

const TooltipOrders = ({ renderedCellValue }: TooltipProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
        <Box padding='1rem'>
          {renderedCellValue?.map((product: string, index: string) => (
            <Typography key={index}>{product}</Typography>
          ))}
        </Box>
      </Popover>
    );
  }, [open, renderedCellValue]);

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <VisibilityIcon />
      </IconButton>
      {PopoverMemo}
    </Box>
  );
};

export default TooltipOrders;
