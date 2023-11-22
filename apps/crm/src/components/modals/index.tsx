import { ModalState, setModalState, useModalState } from "../../observables";
import { DeliveryCostDetailModal } from "../../pages/settings/pricing/modals/DeliveryCostDetailModal";
import { DeliveryCostModal } from "../../pages/settings/pricing/modals/DeliveryCostModal";
import { Modal as ModalMUI } from '@mui/material';

const modals = {
    [ModalState.DELIVERY_COSTS]: () => <DeliveryCostModal />,
    [ModalState.DELIVERY_COSTS_DETAIL]: (props?: any) => <DeliveryCostDetailModal data={props?.data}/>,
};

export const Modal = () => {
    const modalState = useModalState();

    const handleCloseModal = async () => {
        setModalState(undefined)
    }

    return (
        <ModalMUI
            onClose={handleCloseModal}
            open={!!modalState?.data}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <>
                {!!modalState?.data &&
                    modals[modalState?.data?.name]({ data: modalState.data.meta })}
            </>
        </ModalMUI>
    );
};
