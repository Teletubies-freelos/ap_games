import { IconButton, Typography } from "@mui/material";
import { ModalLayout } from "../../../../../../../packages/ui/src";
import { setModalState, setPrevState } from "../../../../observables";
import HeadModal from "../../../../components/common/HeaderModal";
import { IFormDeliveryCostData } from "./DeliveryCostData";
import { DeliveryCostDetailData } from "./DeliveryCostDetailData";

const handleBack = () => {
    setPrevState();
};

export const DeliveryCostDetailModal = ({ data }: { data: IFormDeliveryCostData }) => {
    return (
        <ModalLayout
            headerModal={
                <HeadModal
                    onClose={() => setModalState(undefined)}
                    title={<Typography variant='h5'>Agregar costo de envío</Typography>}
                    icon={<IconButton onClick={handleBack} />}
                />
            }
        >
            <DeliveryCostDetailData data={data} />
        </ModalLayout>
    )
}