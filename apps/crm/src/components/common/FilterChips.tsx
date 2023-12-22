import { Autocomplete, Box, Chip, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function FilterChips({
    values = [],
    selections = [],
    handleSelections,
    debounceValueSearch,
    handleSearchChange,
    placeholder,
    disabled
}: any) {
    return (
        <>
            <Autocomplete
                disabled={disabled}
                options={values}
                freeSolo
                sx={{
                    width: {
                        xs: '90vw',
                        md: 'unset'
                    },
                    backgroundColor: "background.default",
                    borderRadius: ".25rem",
                    "& .MuiAutocomplete-endAdornment": {
                        display: 'none'
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        onChange={handleSearchChange}
                        value={debounceValueSearch}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            placeholder: placeholder,
                            startAdornment: (<InputAdornment position="start" sx={{ paddingLeft: '0.5rem' }} children={<SearchIcon />} />)
                        }}
                    />
                )}
                getOptionLabel={(option: any) => {
                    if (typeof option === 'string') {
                        return option;
                    } else {
                        return option.label || '';
                    }
                }}
                onChange={(_, value) => {
                    // @ts-ignore
                    if (value.value && selections.find(({ value: r }) => r == value?.value) == null) {
                        // @ts-ignore
                        handleSelections(prev => [...prev, { label: value?.label, value: value?.value }])
                    }
                }}
            />
            <Box
                sx={{
                    '& > :not(:last-child)': { mr: 1, mb: 1 },
                    '& > :last-child': { mb: 1 },
                }}
            >
                {
                    selections.map(({ value, label } : any) => <Chip key={value} label={label} onDelete={() => handleSelections((prev: any) => [...prev.filter((item: any, _ : any) => item.value != value)])} />)
                }
            </Box>
        </>);
}