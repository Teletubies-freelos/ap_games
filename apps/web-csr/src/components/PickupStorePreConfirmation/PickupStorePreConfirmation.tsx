import { Box, TextField, Typography, Button, Stack } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ModalState, setModalState, setPurchaseCode } from '../../observables';
import {
    useCreateOne,
    useGetList,
    useGetOne,
} from 'data_providers';
import { ProviderNames } from '../../types/providers';
import { useForm } from 'react-hook-form';
import CustomAcordion from '../common/CustomAcordion';
import { ICartProduct } from '../../data/indexedDB';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useConfirmRequest } from '../../hooks/useConfirmRequest';
import { UserInfo } from '../../services/SessionStorage';
import { useMemo, useState } from 'react';
import { DeliveryWayEnum, IDeliveryWay } from '../../services/DeliveryWays';
import { reduceQuantity, reduceTotalPrice } from '../../utils';
import { LoadingPage } from '../../../../../packages/ui/src';

export interface PickUpInfo {
    paymentMethod: string;
    payment_method_id: number;
    order_status_id: number;
    comment: string;
    client_name: string;
    phone: string;
    email: string;
    delivery_way_id: number;
}

interface IDeliveryInfo {
    name: [string, string?];
    email: [string, string?];
    phone: [string, string?];
}

export default function PickupStorePreConfirmationBody() {
    const { handleSubmit } = useForm<PickUpInfo>();
    const createToSession = useCreateOne(ProviderNames.SESSION_STORAGE);
    const confirmRequest = useConfirmRequest();
    const queryClient = useQueryClient();

    const [isCreatingOrder, setIsCreatingOrder] = useState<boolean>(false);

    const getClientData = useGetOne<UserInfo>(ProviderNames.SESSION_STORAGE);
    const { data: orderData } = useQuery(['order'], async () => await getClientData());
    const handleFinish = async (data: PickUpInfo) => {
        setIsCreatingOrder(true);
        const orderStatuses: { order_status_id: number; name: string }[] | undefined = queryClient.getQueryData(['orderStatus'])

        const deliveryWays: IDeliveryWay[] | undefined = queryClient.getQueryData(['deliveryWays'])

        const { delivery_way_id } = deliveryWays?.find(({ token }) => token === DeliveryWayEnum.PICKUP_STORE) ?? {}

        const { order_status_id } = orderStatuses?.find(({ name }) => name === 'pending') ?? {}

        if (!order_status_id)
            throw new Error('Order status not found')

        const newDataPayment = {
            ...data,
            order_status_id,
            delivery_way_id,
            delivery_price: 0
        };
        
        await createToSession(newDataPayment);
        const requestOrderId = await confirmRequest(newDataPayment);
        requestOrderId && setPurchaseCode(requestOrderId);
        setIsCreatingOrder(false);
        setModalState({
            data: {
                name: ModalState.IN_STORE_CONFIRMATION,
            },
        });
    };

    const getCartProducts = useGetList<ICartProduct>(ProviderNames.CART);
    const getPaymentMethods = useGetList(ProviderNames.PAYMENT_METHODS);
    const { data } = useQuery(['cart'], async () => await getCartProducts());
    const { data: paymentMethods } = useQuery(
        ['payment_methods'],
        async () => await getPaymentMethods()
    );

    const totalPrice = reduceTotalPrice(data);

    const parsedPaymentMethods = paymentMethods?.reduce((hash, method) => {
        hash[method.payment_method_id] = method.meta;
        return hash;
    }, {});

    const totalQuantity = reduceQuantity(data);

    const deliveryInfo: IDeliveryInfo = useMemo((): IDeliveryInfo => ({
        name: ["Nombre", orderData?.client_name],
        email: ["Correo", orderData?.email],
        phone: ["Teléfono", orderData?.phone?.toString()],
    }), [orderData]);

    if(isCreatingOrder)
        return (<LoadingPage minHeight={"40vh"}/>);

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit(handleFinish)}
            display='flex'
            flexDirection='column'
            gap='.75rem'
            padding='1.4rem'
        >
            <CustomAcordion
                header={
                    <Stack>
                        <Typography>Tu Pedido</Typography>
                        <Typography>{totalQuantity} productos</Typography>
                    </Stack>
                }
                content={
                    <Box>
                        {data?.map((product) => (
                            <Box
                                display='flex'
                                justifyContent='space-between'
                                padding='.5rem 0'
                                key={product.id}
                            >
                                <Typography>{product.name} x {product.quantity} </Typography>
                                <Typography>S/.{product.price}.00</Typography>
                            </Box>
                        ))}
                    </Box>
                }
            />
            <CustomAcordion
                header={
                    <Stack>
                        <Typography>Información de entrega</Typography>
                    </Stack>
                }
                content={
                    <Box>
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            padding='.5rem 0'
                        >
                            <Typography>{deliveryInfo?.name[0]}</Typography>
                            <Typography>{deliveryInfo?.name[1]}</Typography>
                        </Box>
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            padding='.5rem 0'
                        >
                            <Typography>{deliveryInfo?.email[0]}</Typography>
                            <Typography>{deliveryInfo?.email[1]}</Typography>
                        </Box>
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            padding='.5rem 0'
                        >
                            <Typography>{deliveryInfo?.phone[0]}</Typography>
                            <Typography>{deliveryInfo?.phone[1]}</Typography>
                        </Box>
                    </Box>
                }
            />
            <TextField
                disabled
                sx={{ backgroundColor: 'background.default' }}
                value={orderData?.payment_method_id && parsedPaymentMethods.hasOwnProperty(orderData?.payment_method_id) && parsedPaymentMethods[orderData.payment_method_id]}
            />
            <TextField
                disabled
                id='outlined-multiline-flexible'
                sx={{ backgroundColor: 'background.default' }}
                placeholder='Agregar comentario (opcional)'
                multiline
                minRows={4}
                maxRows={5}
                value={orderData?.comment}
            />
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
                    sx={{ color: 'text.secondary' }}
                >
                    S/ {totalPrice?.toFixed(2)}
                </Typography>
            </Box>
            <Box
                display='flex'
                justifyContent='center'
                gap='.5rem'
                alignItems='center'
            >
                <InfoOutlinedIcon sx={{ color: 'primary.main' }} />
                <Typography textAlign='center' sx={{ color: 'primary.main' }}>
                    El pago lo realizarás al momento de la entrega en el caso de efectivo
                </Typography>
            </Box>
            <Button
                type='submit'
                variant='contained'
                sx={{ width: '100%', margin: '0 auto' }}
            >
                Confirmar pedido
            </Button>
            <Typography
                sx={{
                    color: 'text.secondary',
                    textAlign: 'center',
                }}
            >
                Al hacer click en confirmar, acepto los términos de uso y Políticas de
                privacidad
            </Typography>
        </Box>
    );
}
