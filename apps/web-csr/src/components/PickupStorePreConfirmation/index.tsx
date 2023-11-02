import { Typography } from "@mui/material";
import { ModalLayout } from "../../../../../packages/ui/src";
import HeadModal from "../common/HeadModal";
import { PrevButton } from "../PrevMainModalButton";
import PickupStorePreConfirmationBody from "./PickupStorePreConfirmation";
import { setModalState } from "../../observables";

export default function PickupStorePreConfirmationModal() {
    return (
        <ModalLayout
            headerModal={
                <HeadModal
                    onClose={() => setModalState(undefined)}
                    title={<Typography variant='h5'>Resumen</Typography>}
                    icon={<PrevButton  />}
                />
            }
        >
            <PickupStorePreConfirmationBody />
        </ModalLayout>
    );
}
