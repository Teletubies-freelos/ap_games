import { Typography } from "@mui/material";
import { ModalLayout } from "../../../../../packages/ui/src";
import { setModalState } from "../../observables";
import { PrevButton } from "../PrevMainModalButton";
import PickupInfoModalBody from "./PickupInfoModalBody";
import HeadModal from "../common/HeadModal";

export default function PickupStoreInfoModal() {
    return (
        <ModalLayout
            headerModal={
                <HeadModal
                    onClose={() => setModalState(undefined)}
                    title={<Typography variant='h5'>Tus Datos</Typography>}
                    icon={<PrevButton />}
                />
            }
        >
            <PickupInfoModalBody />
        </ModalLayout>
    );
}
