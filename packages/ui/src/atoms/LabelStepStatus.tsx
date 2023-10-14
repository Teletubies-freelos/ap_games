import { Box, Typography, SxProps } from "@mui/material";
import { tss } from "tss-react/mui";

export interface LabelStepStatusProps {
  property: string;
  value?: number | string;
  icon?: JSX.Element;
  sx?: SxProps;
}

export default function LabelStepStatus({
  property,
  value,
  icon,
  sx,
}: LabelStepStatusProps) {
  const LabelStatusStyles = tss.create(({ theme }) => ({
    propertyStyle: {
      fontWeight: 600,
    },
    valueStyle: {
      color: theme.palette.text.primary,
      fontSize: "1rem",
      fontWeight: 600,
    },
  }));

  const { classes } = LabelStatusStyles();

  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent={{ xs: "flex-start", sm: "space-between" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      sx={{
        background: "#F8FBFF",
        padding: ".5rem 1rem",
        width: "100%",
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...sx,
      }}
    >
      <Box display="flex" gap="1rem">
        {icon}
        <Typography
          className={classes.propertyStyle}
          variant={"h5"}
          component={"h5"}
          sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
        >
          {property}
        </Typography>
      </Box>
      {value && <Typography className={classes.valueStyle}>{value}</Typography>}
    </Box>
  );
}
