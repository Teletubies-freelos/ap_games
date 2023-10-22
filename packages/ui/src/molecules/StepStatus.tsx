import { Check } from "@mui/icons-material";
import { Box, Step, StepLabel, Stepper, SxProps } from "@mui/material";

const StepIcon = ({isActive}:{isActive?: boolean}) => (
  <Check
    sx={{
      padding: "2px",
      border: `${isActive? '2px': '1px'} solid`,
      borderColor: isActive? 'primary.main': 'unset',
      color: isActive? "#7339FF": 'gray',
      borderRadius: "1rem",
      fontSize: "1.2rem",
      fontWeight: 'bolder'
    }}
  />
);

export interface Step{
  label: string;
  isActive?: boolean;
}

export default function StepStatus({
  steps,
  sx,
}: {
  steps: Step[];
  sx?: SxProps;
}) {
  return (
    <Box sx={{ width: "100%", ...sx }}>
      <Stepper alternativeLabel>
        {steps.map(({label, isActive}) => (
          <Step active={isActive} key={label}>
            <StepLabel icon={<StepIcon isActive={isActive} />} color="red">
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
