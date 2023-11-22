import { Add, Done } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { MouseEventHandler } from "react";
import { Discount, Tag } from "..";

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
        height: "11rem",
      })}
      className={className}
    >
      <Box onClick={onCardClick} display={"flex"} height="100%">
        <Box
          sx={{
          }}
        >
          <CardMedia
            component="img"
            alt={alt}
            src={src}
            height={"100%"}
            sx={{
              margin: "auto 0",
              padding: "0.6rem",
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
          <Box display='flex' alignItems="flex-end" gap={2}>
            <Box display='flex' flexDirection="column">
              {!!previousPrice && (
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", fontSize: "1.3rem", }}
                >
                  S/ {previousPrice}
                </Typography>
              )}
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1.3rem",
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                S/ {price}
              </Typography>
            </Box>
            <Box>
              {!!previousPrice && <Tag label="Oferta" icon={<Discount />} />}
            </Box>
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
              bottom: { xs: "3.15rem", sm: "3.2rem" },
              right: "0.85rem",
              padding: 0.6,
              minWidth: "unset",
              aspectRatio: !inCart ? 1 : 'unset',
            }}
          >
            {inCart ? <Done /> : <Add />}
          </Button>
        </Box>
    </Card>
  );
}