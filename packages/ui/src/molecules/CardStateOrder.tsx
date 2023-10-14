import { Box, ListItem, Typography } from "@mui/material";

interface CardStateOrderProps {
  img: JSX.Element;
  title: string;
  price: number | string;
  quantity?: JSX.Element;
}

export default function CardStateOrder({
  img,
  title,
  price,
  quantity,
}: CardStateOrderProps) {
  return (
    <ListItem
      sx={{
        height: "auto",
        maxHeight: "4.75rem",
        alignItems: "center",
        margin: "0.5rem 0",
        backgroundColor: "background.default",
        borderRadius: ".5rem",
      }}
    >
      {img}
      <Box width="100%" display="flex" alignItems="center">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            marginLeft: "1rem",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              height: "100%",
              fontSize: { xs: ".8rem !important", sm: "1rem !important" },
              width: "13rem !important",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
          {quantity}
          <Typography
            component="span"
            width="4rem"
            variant="body1"
            color="text.primary"
            sx={{
              fontSize: { xs: ".8rem !important", sm: ".9rem !important" },
              fontWeight: 500,
            }}
          >
            S/.{price}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
}
