import { Box } from "@mui/material";
import { MainLogo } from "..";

const LoadingPage = ({ minHeight = '100vh' }: { minHeight?: string | number | undefined }) => (
  <Box
    minHeight={minHeight}
    display={'grid'}
    sx={{ placeItems: 'center' }}
  >
    <MainLogo sx={{
      fontSize: '8rem',
      animation: 'pulse .5s ease-in-out infinite',
      '@keyframes pulse': {
        '50%': {
          transform: 'scale(1.2)'
        }
      }
    }} />
  </Box>
)


export default LoadingPage
