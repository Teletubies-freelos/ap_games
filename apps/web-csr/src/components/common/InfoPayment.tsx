import { Box, Stack, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface InfoPaymentProps {
  titleInfo: string;
  content: JSX.Element;
}

export default function InfoPayment({ titleInfo, content }: InfoPaymentProps) {
  return (
    <Stack
      sx={{
        width: '100%',
        background: '#D1E6F5',
        border: '1px solid #2193CE',
        borderRadius: '.3rem',
        padding: '.9rem',
        marginTop: '1rem',
        color: '#000',
      }}
    >
      <Box display='flex' alignItems='center' gap='1.25rem'>
        <InfoOutlinedIcon
          sx={{
            color: '#2193CE',
            alignSelf: 'flex-start',
          }}
        />
        <Stack>
          <Typography
            textAlign='left'
            sx={{
              fontSize: '.9rem',
              fontWeight: 600,
            }}
          >
            {titleInfo}
          </Typography>
          {content}
        </Stack>
      </Box>
    </Stack>
  );
}
