import { IconButton, Typography } from "@mui/material";
import { ModalLayout } from "../../../../../../packages/ui/src";
import HeadModal from "../../../components/common/HeaderModal";
import { setModalState, setPrevState } from "../../../observables";
import { UpdateCategoryData } from "./UpdateCategoryData";
import { ICategory } from "../../../services/Categories";

const handleBack = () => {
    setPrevState();
};

export const UpdateCategoryModal = ({ data }: { data: ICategory }) => {
    return (<ModalLayout
        headerModal={
            <HeadModal
                onClose={() => setModalState(undefined)}
                title={<Typography variant='h5'>Editar categoría</Typography>}
                icon={
                    <IconButton onClick={handleBack}>
                    </IconButton>
                }
            />
        }
    >
        <UpdateCategoryData data={data}/>
    </ModalLayout>);
}