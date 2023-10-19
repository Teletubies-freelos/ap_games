import { MouseEvent } from 'react';

import { IconButton, Badge } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';

export interface CartIconProps {
  qty?: number;
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  size?: 'inherit' | 'large' | 'medium' | 'small';
  'data-testid': string;

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 *
 * @param {CartIconProps}
 */
const CartIcon = ({
  qty,
  onClick,
  size,
  'data-testid': dataTestId,
}: CartIconProps) => (
  <IconButton onClick={onClick} data-testid={dataTestId}>
    <Badge color='primary' badgeContent={qty}>
      <ShoppingCartOutlined fontSize={size} />
    </Badge>
  </IconButton>
);

export default CartIcon;
