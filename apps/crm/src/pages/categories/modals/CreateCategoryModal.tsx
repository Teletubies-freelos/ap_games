import { IconButton, Typography } from "@mui/material";
import { ModalLayout } from "../../../../../../packages/ui/src";
import HeadModal from "../../../components/common/HeaderModal";
import { setModalState, setPrevState } from "../../../observables";
import { CreateCategoryData } from "./CreateCategoryData";

const handleBack = () => {
    setPrevState();
};

export const CreateCategoryModal = () => {
    return (<ModalLayout
        headerModal={
            <HeadModal
                onClose={() => setModalState(undefined)}
                title={<Typography variant='h5'>Agregar categorías</Typography>}
                icon={
                    <IconButton onClick={handleBack}>
                    </IconButton>
                }
            />
        }
    >
        <CreateCategoryData />
    </ModalLayout>);
}