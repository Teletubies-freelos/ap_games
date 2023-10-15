import { Box, Stack, SxProps, Typography, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


interface FooterModalProps {
  nameButton: string;
  infoMessage?: string;
  sx?: SxProps;
  onClick?: () => void;
}

export default function FooterModal({
  nameButton,
  infoMessage,
  onClick,
  sx,
}: FooterModalProps) {
  return (
    <Stack sx={sx}>
      <Button variant='contained' onClick={onClick}>
        {nameButton}
      </Button>
      {infoMessage && (
        <Box
          display='flex'
          justifyContent='center'
          gap='.5rem'
          alignItems='center'
          margin='.5rem 0'
        >
          <InfoOutlinedIcon
            sx={(theme) => ({ color: theme.palette.primary.main })}
          />
          <Typography
            textAlign='center'
            sx={(theme) => ({ color: theme.palette.primary.main })}
          >
            {infoMessage}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
