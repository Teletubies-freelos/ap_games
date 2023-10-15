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
import Tag from "../atoms/Tag";
import Discount from "../atoms/Discount";

export interface CardProductProps {
  alt: string;
  src: string;
  title: string;
  description: string;
  price: number;
  previousPrice?: number;
  category_id?: number;
  onAdd?: MouseEventHandler<HTMLButtonElement>;
  onViewDetail?: MouseEventHandler<HTMLImageElement>;
  className?: string;
}

export default function CardProduct({
  alt,
  src,
  description,
  price,
  title,
  previousPrice,
  onAdd,
  onViewDetail,
  className,
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
      <Box display={"flex"} height="100%">
        <Box
          sx={{
            maxWidth: "6rem",
          }}
        >
          <CardMedia
            onClick={onViewDetail}
            component="img"
            alt={alt}
            src={src}
            height={"100%"}
            sx={{
              objectFit: "contain",
              margin: "auto 0",
              padding: "1rem",
              width: "100%",
              cursor: "pointer"
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
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
            <Box>
              {!!previousPrice && (
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", color: "text.subdued" }}
                >
                  S/ {previousPrice}
                </Typography>
              )}
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1.1em",
                  color: "text.primary",
                }}
              >
                S/ {price}
              </Typography>
            </Box>
            {!!previousPrice && <Tag icon={<Discount />} label="Oferta" />}
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
          onClick={onAdd}
          variant="contained"
          sx={{
            position: "relative",
            bottom: { xs: "2.8rem", sm: "3.2rem" },
            right: "2rem",
            height: { xs: "1.8rem", sm: "2.5rem" },
            minWidth: "unset",
            aspectRatio: 1,
            padding: 0,
          }}
        >
          <Add />
        </Button>
      </Box>
    </Card>
  );
}
