import { Box } from "@mui/material";
import { MainLogo } from "..";

const LoadingPage = ()=>(
  <Box 
    minHeight={'100vh'} 
    display={'grid'} 
    sx={{placeItems: 'center'}} 
  >
    <MainLogo sx={{
      fontSie: '8rem',
      animation: 'pulse .5s ease-in-out infinite',
      '@keyframes pulse':{
        '50%':{
          transform: 'scale(1.2)'
        }
      }
    }} />
  </Box>
)


export default LoadingPage
