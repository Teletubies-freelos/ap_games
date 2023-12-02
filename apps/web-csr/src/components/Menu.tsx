import { Link } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Popover, Stack, Typography, styled } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { FacebookLogo, InstagramLogo, TiktokLogo } from "../../../../packages/ui/src";
import { setAnchorElMenu, setCategoryIdSelected, useAnchorElMenu } from "../observables";
import { useGetList } from "data_providers";
import { ProviderNames } from "../types/providers";
import { useQuery } from "@tanstack/react-query";

interface LiItemProps {
  label: string
}

export const Label = styled(Link)`
  text-decoration: none;
`;

function LiItem({ label }: Readonly<LiItemProps>) {
  return (
    <Typography
      variant="h3"
      sx={{ color: "text.emphasized", fontSize: 18, fontWeight: 500 }}
    >
      {label}
    </Typography>
  )
}

export default function Menu() {
  const anchorEl = useAnchorElMenu();
  const getCategories = useGetList(ProviderNames.CATEGORIES)
  const { data } = useQuery(['categories'], async () => await getCategories());

  const handleClose = () => {
    setAnchorElMenu(null);
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{
        "& >.MuiPaper-root": {
          top: { xs: "0 !important", md: "7rem !important"},
          borderRadius: "0 0 20px 0",
          boxShadow: "0px 8px 0px 0px rgba(0, 0, 0, 0.08), 0px 1.8px 0px 0px rgba(0, 0, 0, 0.05), 0px 0.5px 0px 0px rgba(0, 0, 0, 0.03), 0px -1px 0px 0px rgba(0, 0, 0, 0.04)",
        }
      }}
    >
      <Paper sx={{
        padding: { md: "36px 120px", xs: "2.25rem 1.5rem"},
        background: "background.subdued",
        width: { md: 667, xs: 320 },
      }}
      >
        <Stack sx={{ gap: "1.5rem" }}>
          {/* <LiItem label="Categorias" /> */}
          <Accordion
            sx={{
              background: "transparent",
              boxShadow: "none",
              margin: "0 !important"
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                padding: 0, margin: 0, minHeight: "0 !important",  
                "& .MuiAccordionSummary-content": {
                  margin: "0 !important"
                },
                "& .MuiAccordionSummary-expandIconWrapper": {
                  color: "text.secondary"
                }
              }}
            >
              <Typography variant="body1" sx={{ fontSize: "18px" }}>Categorias</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ padding: "1rem 0 0 36px" }}
            >
              <Stack sx={{ gap: "1rem" }}>
                { data?.map(({ name, category_id }) => (
                  <Box
                    component="a"
                    key={`category-${category_id}`}
                    sx={{ textDecoration: "none", cursor:'pointer' }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 400,
                        color: "text.primary"
                      }}
                      onClick={() => {
                        handleClose()
                        setCategoryIdSelected({category_id, sub_category_id: 0});
                      }}
                    >
                      {name || category_id}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Label onClick={handleClose} to="/estado-pedido">
            <LiItem label="Estado de pedido" />
          </Label>
          <Label onClick={handleClose} to="/terminos">
            <LiItem label="Terminos y condiciones" />
          </Label>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem", alignItems: "center" }}>
            <Typography variant="body1" sx={{ fontSize: "1rem" }}>Síguenos</Typography>

            <Link to="https://www.facebook.com/apgames.pe" target="_blank">
              <FacebookLogo />
            </Link>
            <Link to="https://www.instagram.com/apgames.pe/" target="_blank">
              <InstagramLogo />
            </Link>
            <Link to="https://www.tiktok.com/@apgames_oficial?is_from_webapp=1&sender_device=pc" target="_blank">
              <TiktokLogo />
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Popover>
  );
}
