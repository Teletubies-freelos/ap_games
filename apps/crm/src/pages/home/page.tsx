import { Box, Button, Container, Typography } from "@mui/material"
import { MainLogo } from "../../../../../packages/ui/src"
import { useAuth0 } from "@auth0/auth0-react"

export const Home = () => {
  const { loginWithRedirect } = useAuth0()

  return(
    <Container>
      <Box display={'grid'} minHeight={'90vh'} sx={{placeItems: 'center'}} >
        <Box display={'flex'} gap={8} sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }} >
          <MainLogo />
          <Box display={'grid'} gap={4} >
            <Typography variant={'h1'} sx={{
              textAlign:{
                xs: 'center',
                md: 'unset'
              }
            }} >
              Sistema de gestion de <br/>
              inventario y pedidos
            </Typography>
            <Button onClick={()=> loginWithRedirect()} variant="contained">
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
