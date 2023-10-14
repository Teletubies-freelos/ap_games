import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface MessageInfoProps {
  message: string;
}

export default function MessageInfo({ message }: MessageInfoProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      gap=".5rem"
      alignItems="center"
      marginTop=".5rem"
    >
      <InfoOutlinedIcon
        sx={(theme) => ({ color: theme.palette.primary.main })}
      />
      <Typography
        textAlign="center"
        sx={(theme) => ({ color: theme.palette.primary.main })}
      >
        {message}
      </Typography>
    </Box>
  );
}
