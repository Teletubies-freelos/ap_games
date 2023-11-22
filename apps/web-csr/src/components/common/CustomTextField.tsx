import { TextField, TextFieldProps } from '@mui/material';

interface CustomTextFieldProps {
  label: string;
  type?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | 'number' |undefined;
  width?: string;
  textfieldProps?: TextFieldProps;
  'data-testid'?: string;
  required?: boolean
  inputMode? : "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
}

export default function CustomTextField({
  label,
  type,
  width,
  textfieldProps,
  required = false,
  'data-testid': dataTestId,
  inputMode,
}: CustomTextFieldProps) {
  return (
    <TextField
      id='standard-basic'
      variant='standard'
      required={required}
      type={type}
      label={label}
      inputMode={inputMode}
      data-testid={dataTestId}
      sx={({ palette }) => ({
        width: { width },
        background: `${palette.background.default} !important`,
        border: `1px solid ${palette.primary.main} !important`,
        fontSize: '16px',
        borderRadius: '0.3rem !important',
        padding: '0.5rem  !important',
        '& .MuiFormLabel-root': {
          left: '.5rem',
          '&.Mui-focused': {
            top: '0.65rem !important',
          },
        },
        '& .MuiInputBase-input': {
          height: '.5em !important',
        },
        '& .MuiInputBase-root': {
          padding: '0 !important',
          border: 'none !important',
          '&:after': {
            border: 'none !important',
          },
          '&:before': {
            border: 'none !important',
          },
        },
        '& input[type=number]': {
          '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        },
        '& *': {
          '-webkit-user-select': 'text',
          userSelect: 'text'
        },
      })}
      {...textfieldProps}
    />
  );
}
