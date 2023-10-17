import { Box, TextField, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button, DropDown } from '../../../../../packages/ui/src';
import { ModalState, setModalState } from '../../observables';
import SelectModals from '../common/SelectModals';

export default function PaymentMethodBody() {
  const handleFinish = () => {
    setModalState({
      prevModal: ModalState.DELIVERY_CENTRAL_PAYMENT_METHOD,
      currentModal: ModalState.DELIVERY_CENTRAL_CONFIRMATION
    })
  };

  return (
    <Box display='flex' flexDirection='column' gap='.75rem' padding='1.4rem'>
      <SelectModals
        label='Tu pedido'
        groupOptions={[
          { id: 1, name: '2 Productos' },
          { id: 2, name: 'opcion 2' },
        ]}
      />
      <DropDown items={[{ value: '1', label: 'primera opcion' }]}></DropDown>
      <DropDown items={[{ value: '1', label: 'primera opcion' }]}></DropDown>

      <TextField
        id='outlined-multiline-flexible'
        sx={{ backgroundColor: "background.default" }}
        placeholder='Agregar comentario (opcional)'
        multiline
        minRows={4}
        maxRows={5}
      />
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        padding='0 1rem'
      >
        <Typography variant='h6'>Costo de delivery</Typography>
        <Typography
          component='p'
          variant='body2'
          sx={{ color: "text.secondary" }}
        >
          S/ 20.00
        </Typography>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        padding='0 1rem'
      >
        <Typography variant='h6'>Total</Typography>
        <Typography
          component='p'
          variant='body2'
          sx={{ color: "text.secondary" }}
        >
          S/ 480.00
        </Typography>
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        gap='.5rem'
        alignItems='center'
      >
        <InfoOutlinedIcon
          sx={{ color: "primary.main" }}
        />
        <Typography
          textAlign='center'
          sx={{ color: "primary.main" }}
        >
          El pago lo realizarás al momento de la entrega en el caso de efectivo
        </Typography>
      </Box>
      <Button
        onClick={handleFinish}
        variant='contained'
        label='Confirmar pedido'
        sx={{ width: '100%', margin: '0 auto' }}
      />
      <Typography
        sx={{
          color: "text.secondary",
          textAlign: 'center',
        }}
      >
        Al hacer click en confirmar, acepto los términos de uso y Políticas de
        privacidad
      </Typography>
    </Box>
  );
}
