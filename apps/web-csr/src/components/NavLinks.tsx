import { Link as MUILink, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NavLinks() {
  const CustomLink = styled(Link)`
    text-decoration: none;
  `;

  return (
    <>
      <CustomLink to='/estado-pedido'>
        <MUILink
          sx={({ palette }) => ({
            display: { xs: 'block', md: 'none' },
            textDecoration: 'none',
            fontSize: { xs: '.8rem', sm: '.875rem' },
            color: palette.primary.main,
            fontWeight: 500,
          })}
        >
          Pedidos
        </MUILink>
      </CustomLink>
      <CustomLink to='/estado-pedido'>
        <MUILink
          sx={({ palette }) => ({
            display: { xs: 'none', md: 'block' },
            textDecoration: 'none',
            fontSize: '.875rem',
            color: `${palette.text.primary} !important`,
            fontWeight: 500,
            whiteSpace: 'nowrap',
          })}
        >
          Estado de Pedido
        </MUILink>
      </CustomLink>
    </>
  );
}
