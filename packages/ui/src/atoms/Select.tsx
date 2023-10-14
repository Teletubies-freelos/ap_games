import { PropsWithChildren, useCallback, useState } from "react";
import {
  Select as MUISelect,
  FormControl,
  Box,
  MenuItem,
  SxProps,
  SelectChangeEvent,
} from "@mui/material";

import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";

export interface IOption {
  value: string | number;
  label: string;
}

export interface SelectFilterProps<T extends IOption = IOption> {
  items?: T[];
  sxForm?: SxProps;
  sxSelect?: Record<string, unknown>;
  onChange?: (event: SelectChangeEvent) => void;
}

export default function SelectFilter({
  items,
  sxForm,
  sxSelect,
  children,
  onChange,
}: PropsWithChildren<SelectFilterProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const ArrowDown = useCallback(
    () => (
      <Box
        onClick={() => setIsOpen((prev) => !prev)}
        sx={{
          cursor: "pointer",
          marginRight: 1,
          paddingLeft: 1,
          borderLeftStyle: "solid",
          borderLeftWidth: 0.5,
        }}
      >
        <ArrowDropDownIcon />
      </Box>
    ),
    [],
  );

  return (
    <FormControl sx={sxForm}>
      <MUISelect
        onChange={onChange}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        defaultValue={String(1)}
        IconComponent={ArrowDown}
        sx={({ palette }) => ({
          backgroundColor: palette.background.default,
          ...sxSelect,
        })}
      >
        {items?.map(({ label, value }) => (
          <MenuItem value={value} key={label + value}>
            {label}
          </MenuItem>
        ))}
        {children}
      </MUISelect>
    </FormControl>
  );
}
