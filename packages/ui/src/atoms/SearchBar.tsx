import { SearchOutlined } from "@mui/icons-material";
import { Autocomplete, InputAdornment, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

export interface ISearch {
  search: string;
}
interface SearchBarProps {
  placeHolder?: string;
  direction?: "row" | "column";
  onSubmit: SubmitHandler<ISearch>;
  buttonSearch?: JSX.Element;
}
const sx = {
  width: "100%",
  backgroundColor: "white",
  borderRadius: ".25rem",
  "& input": { color: "#434343" },
}

export default function SearchBar({
  placeHolder,
  direction = "row",
  onSubmit,
  buttonSearch,
}: SearchBarProps) {
  const { register, handleSubmit } = useForm<ISearch>();

  return (
    <Stack
      width="100%"
      direction={direction}
      gap="1rem"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        sx={sx}
        placeholder={placeHolder}
        id="input-with-icon-textfield"
        inputProps={register("search")}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{
                color: 'primary.main',
              }}
            >
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      {buttonSearch}
    </Stack>
  );
}
