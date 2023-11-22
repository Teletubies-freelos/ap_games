import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

interface CustomAccordionProps {
  header: JSX.Element;
  content: JSX.Element;
}

export default function CustomAccordion({
  header,
  content,
}: CustomAccordionProps) {
  return (
    <Accordion sx={{ boxShadow: "none !important" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={(theme) => ({
          background: theme.palette.background.default,
          borderRadius: ".3rem",
          border: `0.2px solid ${theme.palette.grey[100]}`,
        })}
      >
        {header}
      </AccordionSummary>
      <AccordionDetails
        sx={({ palette }) => ({
          background: palette.background.default,
          borderRadius: ".3rem",
        })}
      >
        {content}
      </AccordionDetails>
    </Accordion>
  );
}