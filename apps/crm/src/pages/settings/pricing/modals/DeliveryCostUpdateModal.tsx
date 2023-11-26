import { IconButton, Typography } from "@mui/material";
import { ModalLayout } from "../../../../../../../packages/ui/src";
import { setModalState, setPrevState } from "../../../../observables";
import HeadModal from "../../../../components/common/HeaderModal";
import { DeliveryCostUpdate } from "./DeliveryCostUpdate";
import { IDeliveryCosts } from "../../../../services/DeliveryCosts";

const handleBack = () => {
    setPrevState();
};

export const DeliveryCostUpdateModal = ({data}: {data: IDeliveryCosts}) => {
    return (<ModalLayout
        headerModal={
            <HeadModal
                onClose={() => setModalState(undefined)}
                title={<Typography variant='h5'>Actualizar costo de envío</Typography>}
                icon={
                    <IconButton onClick={handleBack}>
                    </IconButton>
                }
            />
        }
    >
        <DeliveryCostUpdate data={data} />
    </ModalLayout>);
}