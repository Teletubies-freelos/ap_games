import { Box, Button, Stack, Typography } from "@mui/material"
import MaterialReactTable from "material-react-table";
import { ListColumns } from "./Columns";
import { useDeliveryCosts } from "../../../hooks/useDeliveryCosts";
import { ModalState, setModalState } from "../../../observables";

export const PricingModule = () => {
    const list = ListColumns;
    const { data, isFetching } = useDeliveryCosts({});
    
    return (
        <Stack gap={'1rem'} padding={'2rem'}>
            <Box sx={{ backgroundColor: 'background.paper' }} borderRadius={2.5}>
                <Typography variant='h2' padding='2rem' fontWeight={600} fontSize={'1.5rem'}>Costos de envío</Typography>
                <Button sx={{margin:'1rem'}} variant="contained" onClick={() => setModalState({ data: { name: ModalState.DELIVERY_COSTS} })}>Agregar costo de envío</Button>
                <MaterialReactTable
                    columns={list()}
                    data={data ?? []}
                    enableStickyHeader
                    muiTableContainerProps={{
                        sx: {
                            maxHeight: '75vh',
                        },
                    }}
                    state={{ isLoading: isFetching }}
                />
            </Box>
        </Stack>
    )
}