import { IconButton, Typography } from "@mui/material";
import { ModalLayout } from "../../../../../../../packages/ui/src";
import { setModalState, setPrevState } from "../../../../observables";
import HeadModal from "../../../../components/common/HeaderModal";
import { DeliveryCostData } from "./DeliveryCostData";
const handleBack = () => {
    setPrevState();
};
export const DeliveryCostModal = () => {
    return (<ModalLayout
        headerModal={
            <HeadModal
                onClose={() => setModalState(undefined)}
                title={<Typography variant='h5'>Agregar costo de envío</Typography>}
                icon={
                    <IconButton onClick={handleBack}>
                    </IconButton>
                }
            />
        }
    >
        <DeliveryCostData />
    </ModalLayout>);
}