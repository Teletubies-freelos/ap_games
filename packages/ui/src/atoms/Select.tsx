import { PropsWithChildren, useCallback, useState } from 'react';
import {
  Select as MUISelect,
  FormControl,
  Box,
  MenuItem,
  SxProps,
  SelectChangeEvent,
  SelectProps,
  TextFieldProps,
  InputLabel,
} from '@mui/material';

import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';

export interface IOption {
  value: string | number;
  label: string;
}

export interface SelectFilterProps<T extends IOption = IOption> {
  items?: T[];
  sxForm?: SxProps;
  sxSelect?: Record<string, unknown>;
  onChange?: (event: SelectChangeEvent) => void;
  selectProps?: SelectProps;
  textFieldProps?: TextFieldProps;
  placeHolder?: string;
  defaultValue?: any; 
  disabled?: boolean;
  required?: boolean;
}

export default function SelectFilter({
  items,
  sxForm,
  sxSelect,
  children,
  onChange,
  selectProps,
  textFieldProps,
  placeHolder,
  defaultValue,
  disabled = false,
  required = false
}: PropsWithChildren<SelectFilterProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const ArrowDown = useCallback(
    () => (
      <Box
        onClick={() => setIsOpen((prev) => !prev)}
        sx={{
          cursor: 'pointer',
          marginRight: 1,
          paddingLeft: 1,
          borderLeftStyle: 'solid',
          borderLeftWidth: 0.5,
        }}
      >
        <ArrowDropDownIcon />
      </Box>
    ),
    []
  );

  return (
    <FormControl sx={sxForm}>
      {placeHolder && (
        <InputLabel
          sx={{
            top: "1rem !important",
            "& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ": {
              top: "2rem !important",
            },
            "& .MuiInputLabel-shrink": {
              top: "-4% !important",
            },
            "& .MuiFormLabel-root MuiInputLabel-root ": {
              top: ".3rem !important",
            },
          }}
        >
          {placeHolder}
        </InputLabel>
      )}
      <MUISelect
        // @ts-expect-error no idea why
        onChange={onChange}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        IconComponent={ArrowDown}
        sx={({ palette }) => ({
          backgroundColor: palette.background.default,
          ...sxSelect,
        })}
        {...selectProps}
        {...textFieldProps}
        defaultValue={defaultValue}
        value={defaultValue}
        disabled={disabled}
        required={required}
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
