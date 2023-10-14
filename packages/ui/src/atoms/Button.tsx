import { Button as MUIButton, type ButtonProps } from '@mui/material';
export interface CustomButtonProps extends ButtonProps {
  label: string;
}

export default function Button(props: CustomButtonProps) {
  return <MUIButton {...props}>{props.label}</MUIButton>;
}
