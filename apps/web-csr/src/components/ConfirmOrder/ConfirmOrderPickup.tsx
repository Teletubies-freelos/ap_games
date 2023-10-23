import { useMutation } from "@tanstack/react-query"
import ConfirmedOrder from "."
import { StepStatus } from "../../../../../packages/ui/src"
import { setModalState } from "../../observables"
import FooterModal from "../common/FooterModal"
import { useDeleteMany } from "data_providers"
import { ProviderNames } from "../../types/providers"

const ConfirmOrderPickup = () => {

  const deleteAllProductsInCart = useDeleteMany(ProviderNames.CART)
  const handleSubmit = () => {
    mutate()
    setModalState(undefined)
  }

  const { mutate  } = useMutation(
    ['products_in_cart'],
    async () => await deleteAllProductsInCart()
  );

  return(
    <ConfirmedOrder 
      stepStatus={
        <StepStatus
          steps={[{label: 'En tienda', isActive: true}, {label:'Entregado'}]}
          sx={{ width: '13rem', marginTop: '1.5rem' }}
        />
      }

      footer={
        <FooterModal
          onClick={handleSubmit}
          nameButton="Confirmar pedido"
          infoMessage="Guarda tu número de pedido y realiza el seguimiento en nuestra página principal"
          sx={{
            marginTop: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        />
      }

    />
  )
}

export default ConfirmOrderPickup