import { useMemo } from 'react';
import {
    Button,
    Stack,
    Typography,
    Dialog,
    Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import {
    setIsOpenUpdateOrder,
    useIsOpenUpdateOrder,
} from '../../observables';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AsyncProviderNames } from '../../types/providers';
import { useGetList, useGetOne, useUpdateOne } from 'data_providers';
import { DropDown } from '../../../../../packages/ui/src';
import { IOrders } from '../../services/Orders';
import { IOrderStatuses } from '../../services/OrderStatuses';

interface FormValues {
    order_id: string;
    order_status_id?: string;
}
const UpdateOrderModal = ({ orderId }: { orderId: string | undefined }) => {
    const isOpen = useIsOpenUpdateOrder();
    const queryClient = useQueryClient();
    const { watch, register, handleSubmit, reset, setValue } = useForm<FormValues>({
        defaultValues: {
            order_id: '',
            order_status_id: '',
        },
    });

    const getOrder = useGetOne(AsyncProviderNames.ORDERS);
    const getOrderStatuses = useGetList(AsyncProviderNames.ORDERS_STATUSES);
    const updateOrder = useUpdateOne(AsyncProviderNames.ORDERS);

    const { data: order } = useQuery<IOrders>(
        ['order' + orderId],
        async () => {
            return await getOrder({ id: orderId })
        }
    );

    useMemo(() => {
        if (order) {
            setValue("order_id", orderId!);
            setValue("order_status_id", order?.order_status_id?.toString());
        }
    }, [order, orderId, isOpen])

    const { data: dataOrdersStatuses } = useQuery<IOrderStatuses[]>(
        ['orders_statuses_info'],
        async () => await getOrderStatuses()
    );

    const { mutateAsync } = useMutation(
        ['update_order'],
        async ({
            order_id,
            order_status_id
        }: {
            order_id: string,
            order_status_id: string | undefined
        }) => {
            return await updateOrder({
                order_id,
                order_status_id
            });
        },
        {
            onSuccess: (newProduct) => {
                queryClient.invalidateQueries(
                    ['all_orders_table'],
                    newProduct?.product_id
                );
                queryClient.invalidateQueries(
                    ['order' + orderId],
                    newProduct?.product_id
                );
                reset();
            },
        }
    );

    const onSubmit = async ({
        order_id,
        order_status_id,
    }: FormValues) => {
        await mutateAsync({
            order_id,
            order_status_id
        });

        setIsOpenUpdateOrder(false);
    };

    const parsedOrdersStatuses = dataOrdersStatuses?.map(({ order_status_id, description }) => ({
        value: order_status_id,
        label: description,
    }));

    return (
        <Dialog open={!!isOpen} onClose={() => {
            reset();
            setIsOpenUpdateOrder(false);
        }}>
            <Stack
                sx={{
                    width: '80vw',
                    maxWidth: '30rem',
                    backgroundColor: (theme) => theme.palette.background.paper,
                    padding: '1rem',
                    borderRadius: '.5rem',
                    gap: '1.5rem',
                }}
            >
                <Typography variant='h3' textAlign='center'>
                    Orden
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap='1rem'>
                        <Box sx={{
                            padding: 3,
                            backgroundColor: 'background.paper'
                        }}>
                            <Typography fontWeight={'bolder'} fontSize={'1.2em'}>
                                Número de Identificador
                            </Typography>
                            <Typography color='InactiveCaption'>
                                {orderId}
                            </Typography>
                        </Box>
                        <Stack />
                        <DropDown
                            textFieldProps={register('order_status_id')}
                            sxSelect={{ backgroundColor: 'background.paper' }}
                            items={parsedOrdersStatuses}
                            defaultValue={watch('order_status_id')}
                        />
                        <Button variant='contained' type='submit'>
                            Guardar
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Dialog>
    );
};

export default UpdateOrderModal;
