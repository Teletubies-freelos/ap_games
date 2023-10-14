import { type MouseEventHandler } from "react";

import { CardProduct } from "../../../../../packages/ui/src";
import {
  styled,
} from "@mui/material";

import { cartClient } from "../../modules";


interface CardProductProps {
  alt: string;
  src: string;
  title: string;
  description: string;
  price: number;
  previousPrice?: number;
  onAdd?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}


export const itemContentRender = (handleOnClick: (price: number)=>void) =>
  function (_index: number, product: CardProductProps) {
    const _handleOnClick = () => {
      cartClient.addProduct({
        imageUrl: product.src,
        name: product.title,
        price: product.price,
        quantity: 1,
        priceDiscount: 0,
        productId: product.title
      })

      handleOnClick(product.price)
    }

    return <CardProduct {...product} onAdd={_handleOnClick} />;
  }


export const ListContainer: any = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "2rem",
});

export const ItemContainer: any = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "calc(48% - 1rem)",
  },
}));
