import { Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ModalLayout } from "../../../../../packages/ui/src";
import HeadModal from "../common/HeadModal";

import { setModalState } from "../../observables";

interface CartProps {
  content?: JSX.Element;
}

export function CartModal({ content }: CartProps) {
   return (
      <ModalLayout
        sx={{ maxWidth: "40rem", paddingX: '1rem'  }}
        headerModal={
          <HeadModal
            onClose={()=> setModalState(undefined)}
            title={<Typography variant="h5">Carrito</Typography>}
            icon={<ShoppingCartOutlinedIcon />}
          />
        }
      >
        {content}
      </ModalLayout>
  );
}
