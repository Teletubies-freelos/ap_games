import { SxProps, useTheme } from "@mui/material";
import Carousel from "react-material-ui-carousel";

interface CarouselHeroProps {
  children: JSX.Element[];
  sx: SxProps;
}

const CarouselHero = ({ children, sx }: CarouselHeroProps) => {
  const theme = useTheme();

  return (
    <Carousel
      sx={{
        "& .navButtonsClassName": {
          background: "none !important",
          color: `${theme.palette.primary.main} !important`,
          border: "none",
          opacity: 1,
          "&:hover": {
            background: `${theme.palette.primary.main} !important`,
            color: `#fff !important`,
            opacity: 1,
          },
        },
        "& .activeIndicatorClassName": {
          color: `${theme.palette.primary.main} !important`,
          border: "none",
        },
        "& .indicatorClassName": {
          color: theme.palette.background.paper,
          "&:hover": {
            color: `${theme.palette.primary.main} !important`,
          },
        },
        "& .wraperBtns": {
          top: "40%",
          transform: "translateY(-50%)",
          "& .navButtonsClassName": {
            color: theme.palette.text.primary,
          },
        },
        ...sx,
      }}
      navButtonsProps={{ className: "navButtonsClassName" }}
      navButtonsWrapperProps={{ className: "wraperBtns" }}
      activeIndicatorIconButtonProps={{
        className: "activeIndicatorClassName",
      }}
      indicatorIconButtonProps={{ className: "indicatorClassName" }}
    >
      {children}
    </Carousel>
  );
};

export default CarouselHero;
