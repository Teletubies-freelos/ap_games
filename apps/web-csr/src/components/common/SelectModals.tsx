import { Select, SelectProps } from "@mui/material";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

interface SelectModalsProps extends SelectProps {
  groupOptions: ObjectOption[];
  label?: string;
}

interface ObjectOption {
  id: number | string;
  name: string;
}

export default function SelectModals({
  groupOptions,
  label,
  ...rest
}: SelectModalsProps) {
  return (
    <FormControl
      fullWidth
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
      })}
    >
      {label && (
        <InputLabel
          sx={{
            top: "0.65rem !important",
            left: "0.8rem !important",
            "& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ": {
              height: "1.05rem !important",
            },
            "& .MuiInputLabel-shrink": {
              top: "-4% !important",
            },
            "& .MuiFormLabel-root MuiInputLabel-root ": {
              top: ".3rem !important",
            },
          }}
          variant="standard"
          htmlFor="uncontrolled-native"
        >
          {" "}
          {label}
        </InputLabel>
      )}
      <Select
        disableUnderline
        sx={{
          lineHeight: 2.5,
        }}
        {...rest}
      >
        {groupOptions.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
