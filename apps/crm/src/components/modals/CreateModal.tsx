//modal mui

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
  setIsOpenCreateProduct,
  useIsOpenCreateProduct,
} from '../../observables';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { Photo } from '@mui/icons-material';
import axios from 'axios';
import { env } from '../../config';
import { AsyncProviderNames } from '../../types/providers';
import { useCreateOne, useGetList } from 'data_providers';
import { DropDown } from '../../../../../packages/ui/src';
import { ICategory } from '../../services/Categories';

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
  secondary_img_url?: string;
}

const CreateModal = () => {
  const [imgUrl, setImgUrl] = useState('');

  const { control, register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: '',
      quantity: 0,
      price: 0,
      discount_price: 0,
      img_url: '',
      description: '',
      category_id: 0,
    },
  });

  const queryClient = useQueryClient();

  const getCategories = useGetList(AsyncProviderNames.CATEGORIES);
  const { data: dataCategories } = useQuery<ICategory[]>(
    ['all_categories'],
    async () => await getCategories()
  );

  const createProduct = useCreateOne(AsyncProviderNames.PRODUCTS);

  const { mutateAsync } = useMutation(
    ['create_product'],
    async (payload: FormValues) => {
      return await createProduct(payload);
    },
    {
      onSuccess: (newProduct) => {
        queryClient.invalidateQueries(
          ['all_products_table'],
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
  }: FormValues) => {
    await mutateAsync({
      description,
      img_url: imgUrl,
      name,
      discount_price,
      price,
      quantity,
      category_id,
      is_offer,
      is_visible,
    });

    setIsOpenCreateProduct(false);
  };

  const isOpen = useIsOpenCreateProduct();

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
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

    setImgUrl(`${env.PHOTO_UPLOAD_URL}/${data}`);
  };

  const parsedPaymentMethods = dataCategories?.map((category) => ({
    value: category.category_id,
    label: category.name,
  }));

  return (
    <Dialog open={!!isOpen} onClose={() => setIsOpenCreateProduct(false)}>
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
          Producto Nuevo
        </Typography>
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
              onChange={handleChange}
            />
            <Photo />
          </IconButton>
          {!!imgUrl && (
            <img height={80} width={80} src={imgUrl} alt='uploaded image' />
          )}
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap='1rem'>
            <TextField
              label='Nombre del Producto'
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
            <TextField label='Precio' type='number' {...register('price')} />
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
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label='Es Visible'
                  />
                )}
              />
              <Controller
                name='is_offer'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label='Es Oferta'
                  />
                )}
              />
            </Box>
            <DropDown
              textFieldProps={register('category_id')}
              sxSelect={{ backgroundColor: 'background.paper' }}
              items={parsedPaymentMethods}
            ></DropDown>
            {/*   <TextField
              label='Url de la imagen del Producto'
              {...register('image', {
                required: 'La url de la imagen del producto es obligatorio',
              })}
            /> */}
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

export default CreateModal;
