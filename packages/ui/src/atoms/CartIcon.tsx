import { MouseEvent } from "react";

import { IconButton, Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";

export interface CartIconProps {
  qty?: number;
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  size?: "inherit" | "large" | "medium" | "small";

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 *
 * @param {CartIconProps}
 */
const CartIcon = ({ qty, onClick, size }: CartIconProps) => (
  <IconButton onClick={onClick}>
    <Badge color="primary" badgeContent={qty}>
      <ShoppingCartOutlined fontSize={size} />
    </Badge>
  </IconButton>
);

export default CartIcon;
