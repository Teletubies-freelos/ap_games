import { CircularProgress, Stack, SxProps } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Typography from '@mui/material/Typography';
import { LabelStepStatus } from '../../../../../packages/ui/src';
import totalMoney from '../common/total.svg';
import { 
  usePurchaseCode, 
} from '../../observables';
import { useGetList } from 'data_providers';
import { ProviderNames } from '../../types/providers';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { reduceTotalPrice } from '../../utils';

interface ConfirmedOrderProps {
  footer: JSX.Element;
  infoPayment?: JSX.Element;
  priceDelivery?: JSX.Element;
  stepStatus: JSX.Element;
  sx?: SxProps;
}

export default function ConfirmedOrder({
  footer,
  infoPayment,
  priceDelivery,
  stepStatus,
}: ConfirmedOrderProps) {
  const code = usePurchaseCode();
  const getCartProductList = useGetList(ProviderNames.CART)

  const { data , isFetching } = useQuery(['totalProductsConfirmOrder'], async ()=> await getCartProductList())

  const total = useMemo(()=> reduceTotalPrice(data) ?? 0, [data])

  return (
      <Stack
        sx={(theme) => ({
          background: theme.palette.background.default,
          maxWidth: '40rem',
          minHeight: '40rem',
          width: '100%',
          borderRadius: ' 0.3rem',
          padding: '2rem',
          justifyContent: 'center',
        })}
      >
        <Stack alignItems='center'>
          <CheckCircleOutlineOutlinedIcon
            sx={(theme) => ({
              color: theme.palette.primary.main,
              height: '3.875rem',
              width: '3.875rem',
            })}
          />
          <Typography
            variant='h6'
            sx={(theme) => ({ color: theme.palette.primary.main })}
          >
            ¡Pedido Confirmado!
          </Typography>
          {stepStatus}
          {infoPayment}
        </Stack>
        <Stack marginTop='1.5rem'>
          {priceDelivery}
          { isFetching ? <CircularProgress /> :  <LabelStepStatus
            property='TOTAL'
            icon={<img src={totalMoney} alt='money' />}
            value={`S/. ${total.toFixed()}`}
            sx={{
              fontWeight: 'bold !important',
              fontSize: '1.1rem !important',
            }}
          />}
          <LabelStepStatus
            property='Número de pedido'
            value={code}
            sx={{
              fontSize: '1rem !important',
              marginTop: '1.5rem',
            }}
          />
        </Stack>
        {footer}
      </Stack>
  );
}
