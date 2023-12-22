import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import MaterialReactTable from "material-react-table";
import { ListColumns } from "./Columns";
import { useDeliveryCosts } from "../../../hooks/useDeliveryCosts";
import { ModalState, setModalState } from "../../../observables";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import DeleteConfirmationDialog from "../../../components/modals/DeleteConfirmationDialog";

export const PricingModule = () => {
    const list = ListColumns;
    const { data: deliveryCosts, isFetching, mutateDelete } = useDeliveryCosts({});

    const [dialogState, setDialogState] = useState({
        data: { name: null, meta: null },
        deleteDialogOpen: false,
        deleteItemData: null,
    });

    const handleDelete = () => {
        // @ts-ignore
        mutateDelete(dialogState.deleteItemData)

        setDialogState((prevState) => ({
            ...prevState,
            deleteDialogOpen: false,
            deleteItemData: null,
        }));
    }

    return (
        <Stack gap={'1rem'} padding={'2rem'}>
            <Box sx={{ backgroundColor: 'background.paper' }} borderRadius={2.5}>
                <Typography variant='h2' padding='2rem' fontWeight={600} fontSize={'1.5rem'}>Costos de envío</Typography>
                <Button sx={{ margin: '1rem' }} variant="contained" onClick={() => setModalState({ data: { name: ModalState.DELIVERY_COSTS } })}>Agregar costo de envío</Button>
                <MaterialReactTable
                    columns={list()}
                    data={deliveryCosts ?? []}
                    enableStickyHeader
                    muiTableContainerProps={{
                        sx: {
                            maxHeight: '75vh',
                        },
                    }}
                    state={{ isLoading: isFetching }}
                    enableRowActions
                    renderRowActions={({ row }) => (
                        <Box display='flex'>
                            <IconButton
                                color='secondary'
                                onClick={() => {
                                    setModalState({
                                        data: {
                                            name: ModalState.DELIVERY_COSTS_DETAIL_UPDATE,
                                            meta: deliveryCosts?.find(x => x.delivery_costs_id == row.original.delivery_costs_id)
                                        }
                                    })
                                    //   setIsOpenUpdateProduct(true)
                                    //   setSelectedProductId(row.original.product_id);
                                }}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() =>
                                setDialogState({
                                    deleteDialogOpen: true,
                                    // @ts-ignore
                                    deleteItemData: row.original.delivery_costs_id,
                                })}>
                                <Delete color='error' />
                            </IconButton>
                        </Box>
                    )}
                />
            </Box>
            <DeleteConfirmationDialog
                open={dialogState.deleteDialogOpen}
                onClose={() =>
                    setDialogState((prevState) => ({
                        ...prevState,
                        deleteDialogOpen: false,
                    }))
                }
                onDelete={handleDelete}
            />
        </Stack>
    )
}