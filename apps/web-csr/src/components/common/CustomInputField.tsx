import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';

interface CustomInputFieldProps {
    name: string;
    label: string;
    type?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | 'number' | undefined;
    width?: string;
    'data-testid'?: string;
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
    rules: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    control: Control<any>;
    error: any;
    helperText: any;
}

export default function CustomInputField({
    name,
    label,
    type,
    width,
    'data-testid': dataTestId,
    inputMode,
    rules,
    control,
    error,
    helperText
}: CustomInputFieldProps) {
    console.log("🚀 ~ file: CustomInputField.tsx:29 ~ error:", error)
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <TextField
                    id={`custom-input-${label?.replace(/ /g, "-")}`}
                    variant='standard'
                    type={type}
                    label={label}
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    inputMode={inputMode}
                    data-testid={dataTestId}
                    error={!!error}
                    helperText={helperText || ""}
                    sx={({ palette }) => ({
                        width: { width },
                        background: `${palette.background.default} !important`,
                        border: `1px solid ${palette.primary.main} !important`,
                        fontSize: '16px',
                        borderRadius: '0.3rem !important',
                        padding: '0.5rem  !important',
                        '& .MuiFormLabel-root': {
                            left: '.5rem',
                            top: '.3rem',
                            position: 'absolute',
                            pointerEvents: 'none', backgroundColor: 'transparent !important',

                        }, 
                        '& .MuiInputBase-input:-internal-autofill-selected': {
                            backgroundColor: 'transparent !important',
                        },
                        '& .MuiInputBase-input': {
                            height: '.5em !important',
                            backgroundColor: 'transparent !important',
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
                />)}
            rules={rules}
        />
    );
}
