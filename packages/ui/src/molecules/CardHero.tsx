import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Card as MUICard,
} from "@mui/material";
import { MouseEventHandler } from "react";

export interface CardHeroProps {
  image: string;
  description: string;
  alt: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CardHero = ({ image, alt, onClick, description }: CardHeroProps) => (
  <MUICard
    sx={{
      background: "white",
      maxWidth: 400,
      boxShadow: "none",
      margin: "0 auto !important",
      backgroundColor : (theme)=>theme.palette.background.default
    }}
  >
    <CardMedia
      height={210}
      component="img"
      image={image}
      sx={{ borderRadius: ".5rem" }}
      alt={alt}
    />
    <CardContent
      sx={{
        marginY: "1rem",
        height: "2.4rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",
        paddingY: "0 !important",
      }}
    >
      {description}
    </CardContent>
    <CardActions sx={{ padding: 0 }}>
      <Button
        fullWidth
        variant="outlined"
        sx={{ "&:hover": { background: "#7339FF", color: "#E3E9FF" } }}
        onClick={onClick}
      >
        Agregar al carrito
      </Button>
    </CardActions>
  </MUICard>
);

export default CardHero;
