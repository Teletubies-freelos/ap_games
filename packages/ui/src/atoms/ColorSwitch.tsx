import { Switch } from "@mui/material";

// @ts-ignore
import moonSvg from "./moon.svg";
import { ChangeEventHandler } from "react";

export interface ColorSwitchProps {
  moonUrl?: string;
  overrideCheckBg?: boolean;
  onChange?: ChangeEventHandler;
}

export default function ColorSwitch({
  moonUrl = `url(${moonSvg})`,
  overrideCheckBg,
  onChange,
}: ColorSwitchProps) {
  return (
    <Switch
      onChange={onChange}
      defaultChecked
      sx={(theme) => ({
        padding: 0.2,
        "& .MuiSwitch-track": {
          borderRadius: "1rem",
          borderColor: theme.palette.text.secondary,
          backgroundColor:
            theme.palette.mode == "dark"
              ? `#333 !important`
              : theme.palette.background.paper +
                (overrideCheckBg ? " !important" : ""),
          borderWidth: "0.1rem",
          borderStyle: "solid",
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: theme.palette.primary.main,
        },
        "& .Mui-checked": {
          "& .MuiSwitch-thumb": {
            background: moonUrl,
            backgroundColor: "transparent",
            boxShadow: "none",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          },
        },
      })}
    />
  );
}
