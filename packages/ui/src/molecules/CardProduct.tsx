import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { MouseEventHandler } from "react";

export interface CardProductProps {
  alt: string;
  src: string;
  title: string;
  description: string;
  price: number;
  previousPrice?: number;
  onAdd?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  productId: number | string;
  inCart?: boolean
  onCardClick?: MouseEventHandler<HTMLElement>;
}

export default function CardProduct({
  alt,
  src,
  description,
  price,
  title,
  previousPrice,
  onAdd,
  className,
  inCart,
  onCardClick
}: CardProductProps) {
  return (
    <Card
      sx={({ palette }) => ({
        background: palette.background.default,
        boxShadow: "none",
        borderRadius: ".25rem",
        height: "10rem",
      })}
      className={className}
    >
      <Box onClick={onCardClick} display={"flex"} height="100%">
        <Box
          sx={{
            maxWidth: "6rem",
          }}
        >
          <CardMedia
            component="img"
            alt={alt}
            src={src}
            height={"100%"}
            sx={{
              objectFit: "contain",
              margin: "auto 0",
              padding: "1rem",
              width: "100%",
            }}
          />
        </Box>
        <CardContent
          sx={{
            padding: "1rem !important",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <Box>
            <Typography variant="h3">{title}</Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: ".5rem",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                height: "3.5rem",
                overflow: "hidden",
              }}
            >
              {description}
            </Typography>
          </Box>
          <Box>
            {!!previousPrice && (
              <Typography
                variant="body2"
                sx={{ textDecoration: "line-through" }}
              >
                S/ {previousPrice}
              </Typography>
            )}
            <Typography
              variant="body2"
              sx={{
                fontSize: "1.1em",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              S/ {price}
            </Typography>
          </Box>
        </CardContent>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        height={0}
        alignItems="start"
      >
        {/* TODO: try to use translate instead to avoid shift layout */}
        <Button
          disabled={inCart}
          onClick={onAdd}
          variant="contained"
          sx={{
            position: "relative",
            bottom: { xs: "2.8rem", sm: "3.2rem" },
            right: "2rem",
            padding: 1,
            minWidth: "unset",
            aspectRatio: !inCart ? 1 : 'unset',
          }}
        >
          {inCart? 'En el carrito' : <Add />}
        </Button>
      </Box>
    </Card>
  );
}
