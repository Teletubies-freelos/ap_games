import { Box, Button, TextField } from "@mui/material";
import { ModalState, setModalState } from "../../../../observables";
import { useForm } from "react-hook-form";
import { DropDown } from "../../../../../../../packages/ui/src";
import { DeliveryCostsTypes, deliveryCostsTypesText } from "../../../../services/DeliveryCosts";

export interface IFormDeliveryCostData {
    description: string;
    type: string;
};

const deliveryCostTypes = Object.values(DeliveryCostsTypes).map((key, _) => ({
    value: key,
    label: deliveryCostsTypesText[key as DeliveryCostsTypes],
}))

export const DeliveryCostData = () => {
    const { register, handleSubmit } = useForm<IFormDeliveryCostData>();
    const handleFinish = async (data: IFormDeliveryCostData) => {
        setModalState({
            data: {
                name: ModalState.DELIVERY_COSTS_DETAIL,
                meta: data
            }
        });
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
            <TextField {...register("description")} sx={{ backgroundColor: 'background.default' }} placeholder="Ingresa un nombre para identificarlo" />
            <DropDown textFieldProps={register('type')} items={deliveryCostTypes} placeHolder="Elige un tipo de costo" />
            <Button variant="contained" type="submit">Siguiente</Button>
        </Box>
    );
}