import { ChangeEvent, useMemo, useState } from 'react';
import {
    Button,
    Stack,
    Typography,
    TextField,
    Dialog,
    IconButton,
    FormControlLabel,
    Box,
    Checkbox,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import {
    setIsOpenUpdateProduct,
    useIsOpenUpdateProduct,
} from '../../observables';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Photo } from '@mui/icons-material';
import axios from 'axios';
import { env } from '../../config';
import { AsyncProviderNames } from '../../types/providers';
import { useGetOne, useUpdateOne } from 'data_providers';
import { DropDown } from '../../../../../packages/ui/src';
import { IProduct } from '../../services/Products';
import { useQueryCategory } from '../../hooks/useQueryCategory';

interface FormValues {
    name: string;
    banner_img_url?: string;
    category_id: number;
    description: string;
    discount_price?: number;
    img_url: string;
    is_offer?: boolean;
    is_visible?: boolean;
    price: number;
    quantity: number;
    product_id?: number;
    sub_category_id?: number;
}

const UpdateProductModal = ({ productId }: { productId: number | undefined }) => {
    const isOpen = useIsOpenUpdateProduct();
    const queryClient = useQueryClient();
    const { control, watch, register, handleSubmit, reset, setValue } = useForm<FormValues>({
        defaultValues: {
            name: '',
            quantity: 0,
            price: 0,
            discount_price: 0,
            img_url: '',
            banner_img_url: '',
            description: '',
            category_id: 0,
            product_id: 0,
            is_visible: false,
            is_offer: false,
            sub_category_id: 0,
        },
    });

    const [imageUrls, setImageUrls] = useState({
        imgUrl: '',
        bannerUrl: '',
    });

    const getProduct = useGetOne(AsyncProviderNames.PRODUCTS);
    const updateProduct = useUpdateOne(AsyncProviderNames.PRODUCTS);

    const { data: product } = useQuery<IProduct>(
        ['product' + productId],
        async () => {
            return await getProduct({ id: productId })
        }
    );

    useMemo(() => {
        if (product) {
            setValue("name", product?.name);
            setValue("quantity", product?.quantity);
            setValue("price", product?.price);
            setValue("img_url", product?.img_url);
            setValue("banner_img_url", product?.banner_img_url);
            setValue("description", product?.description);
            setValue("is_offer", product?.is_offer);
            setValue("is_visible", product?.is_visible);
            setValue("sub_category_id", product?.sub_category_id);
            // @ts-ignore
            setValue("category_id", product?.category?.category_id);
            
            setImageUrls({
                imgUrl : product?.img_url ?? '',
                bannerUrl : product?.banner_img_url ?? '',
            })
        }
    }, [product, isOpen])

    const { data: categories } = useQueryCategory({});

    const { mutateAsync } = useMutation(
        ['update_product'],
        async (payload: IProduct) => {
            return await updateProduct(payload);
        },
        {
            onSuccess: (newProduct) => {
                queryClient.invalidateQueries(
                    ['all_products_table'],
                    newProduct?.product_id
                );
                queryClient.invalidateQueries(
                    ['product' + productId],
                    newProduct?.product_id
                );
                reset();
            },
        }
    );

    const onSubmit = async ({
        description,
        name,
        discount_price,
        price,
        quantity,
        category_id,
        is_offer,
        is_visible,
        sub_category_id,
    }: FormValues) => {
        await mutateAsync({
            description,
            img_url: imageUrls.imgUrl,
            banner_img_url: imageUrls.bannerUrl,
            name,
            discount_price,
            price,
            quantity,
            category_id,
            is_offer: Boolean(is_offer),
            is_visible: Boolean(is_visible),
            product_id: Number(productId),
            sub_category_id
        });

        setIsOpenUpdateProduct(false);
    };

    const handleChange = async (
        event: ChangeEvent<HTMLInputElement>,
        imageKey: string
    ) => {
        const [file] = event.target.files ?? [];

        const formData = new FormData();

        formData.append('file', file);

        const { data } = await axios.post(
            `${env.PHOTO_UPLOAD_URL}/index.php`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        setImageUrls({
            ...imageUrls,
            [imageKey]: `${env.PHOTO_UPLOAD_URL}/${data}`,
        });
    };
    const categoriesDropDown = categories?.map(({ category_id, name }) => ({ label: name, value: category_id })) || [];
    let subCategories = categories?.find(({ category_id }) => category_id === watch("category_id"))?.sub_categories?.map(({ sub_category_id, name }) => ({
        label: name,
        value: sub_category_id
    })) || [];

    if (watch("category_id") != 0) {
        subCategories = [{ label: 'Todos', value: 0 }, ...subCategories];
    }
    return (
        <Dialog open={!!isOpen} onClose={() => {
            reset();
            setIsOpenUpdateProduct(false);
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
                    Actualizar Producto
                </Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Stack gap='1rem' alignItems='center'>
                        <Typography>Imagen del Producto</Typography>
                        <IconButton
                            aria-label='upload picture'
                            component='label'
                            sx={{
                                width: '4rem',
                                aspectRatio: 1,
                            }}
                        >
                            <input
                                hidden
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleChange(e, 'imgUrl')}
                            />
                            <Photo />
                        </IconButton>
                        {!!imageUrls?.imgUrl && (
                            <img
                                height={80}
                                width={80}
                                src={imageUrls?.imgUrl}
                                alt='uploaded image'
                            />
                        )}
                    </Stack>

                    <Stack gap='1rem' alignItems='center'>
                        <Typography>Imagen para carousel</Typography>
                        <IconButton
                            aria-label='upload picture'
                            component='label'
                            sx={{
                                width: '4rem',
                                aspectRatio: 1,
                            }}
                        >
                            <input
                                hidden
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleChange(e, 'bannerUrl')}
                            />
                            <Photo />
                        </IconButton>
                        {!!imageUrls?.bannerUrl && (
                            <img
                                height={80}
                                width={120}
                                src={imageUrls?.bannerUrl}
                                alt='uploaded image'
                            />
                        )}
                    </Stack>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap='1rem'>
                        <TextField
                            label='Nombre del Producto'
                            type='text'
                            {...register('name', {
                                required: 'El nombre del producto es obligatorio',
                            })}
                        />
                        <TextField
                            label='Cantidad'
                            type='number'
                            {...register('quantity', {
                                required: 'La cantidad del producto es obligatorio',
                            })}
                        />
                        <TextField
                            label='Precio'
                            type='number'
                            {...register('price')}
                        />
                        <TextField
                            label='Precio Oferta'
                            type='number'
                            {...register('discount_price', {
                                required: 'El Precio del producto es obligatorio',
                            })}
                        />
                        <Box>
                            <Controller
                                name='is_visible'
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            control={<Checkbox {...field} checked={watch('is_visible')} />}
                                            label='Es Visible'
                                        />
                                    )
                                }}
                            />
                            <Controller
                                name='is_offer'
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={watch('is_offer')} />}
                                        label='Es Oferta'
                                    />
                                )}
                            />
                        </Box>
                        {/* <DropDown
                            textFieldProps={register('category_id')}
                            sxSelect={{ backgroundColor: 'background.paper' }}
                            items={parsedPaymentMethods}
                            defaultValue={watch('category_id')}
                        /> */}
                        <DropDown sxSelect={{ backgroundColor: 'background.paper' }} textFieldProps={register('category_id')} defaultValue={watch('category_id')} items={categoriesDropDown} placeHolder="Categorias" />
                        <DropDown sxSelect={{ backgroundColor: 'background.paper' }} textFieldProps={register('sub_category_id')} defaultValue={watch('sub_category_id')} items={subCategories} placeHolder="Sub Categorias" disabled={watch("category_id") == 0} />
                        <TextField
                            label='Descripcion del Producto'
                            rows={3}
                            multiline
                            {...register('description', {
                                required: 'La descripcion del producto es obligatorio',
                            })}
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

export default UpdateProductModal;
