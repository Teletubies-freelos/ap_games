import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box, IconButton } from "@mui/material";

interface HeadModalProps {
  title: JSX.Element;
  icon: JSX.Element;
  onClose?: ()=> void;
}

export default function HeadModal({ 
  title, 
  icon, 
  onClose 
}: HeadModalProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: 'background.default',
        height: "5.25rem",
        padding: " 1rem 1.5rem",
        borderRadius: " 0.3rem 0.3rem 0 0",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap="1rem"
        sx={{
          color:'text.primary',
        }}
      >
        {icon}
        <Typography variant="h6">{title}</Typography>
      </Box>
      <IconButton onClick={onClose}>
        <CloseIcon  />
      </IconButton>
    </Box>
  );
}
