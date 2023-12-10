import { Add, Done } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
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
      <Box
        onClick={onCardClick}
        display="flex"
        width={"100%"}
      >
        <Box
          width={"30%"}
          sx={{
            height: '11rem',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingLeft: '.2rem'
          }}
        >
          <CardMedia
            component="img"
            alt={alt}
            src={src}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box
          width="70%"
          sx={{
            padding: "1rem !important",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box style={{ maxWidth: '95%' }}>
            <Typography
              variant="h3"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Typography>
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
                  sx={{ textDecoration: "line-through", fontSize: "1.1rem", }}
                >
                  S/ {previousPrice}
                </Typography>
              )}
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1.1rem",
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
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        height={0}
        alignItems="start"
      >
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