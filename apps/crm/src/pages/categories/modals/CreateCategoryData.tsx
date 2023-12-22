import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { setModalState } from "../../../observables";
import { useQueryCategory } from "../../../hooks/useQueryCategory";

export interface IFormDeliveryCostData {
    name: string;
};

export const CreateCategoryData = () => {
    const { register, handleSubmit, reset } = useForm<IFormDeliveryCostData>();
    const { mutateCreate } = useQueryCategory({ reset });

    const handleFinish = async (data: IFormDeliveryCostData) => {
        await mutateCreate({
            name: data.name
        });

        setModalState(undefined);
    };

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit(handleFinish)}
            display='flex'
            flexDirection='column'
            gap='.75rem'
            padding='1.4rem'
        >
            <TextField {...register("name")} sx={{ backgroundColor: 'background.default' }} placeholder="Ingresa un nombre para identificarlo" />
            <Button variant="contained" type="submit">Crear Categoría</Button>
        </Box>
    );
}