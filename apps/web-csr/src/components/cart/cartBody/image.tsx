import { Box } from "@mui/material";

interface ImageProps {
  url: string;
}

export const Image = ({ url }: ImageProps) => (
  <Box display="flex" height={"4.75rem"} width="4rem" alignItems={"center"}>
    <img
      src={url}
      srcSet={url}
      alt={url}
      style={{
        height: "80%",
        width: "100%",
        objectFit: "contain",
      }}
      loading="lazy"
    />
  </Box>
);
