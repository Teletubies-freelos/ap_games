//modal mui

import { Button, Stack, Typography, TextField, Dialog, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  categoryId$,
  isRefetchProducts$,
  setIsOpenCategory,
  useIsOpenCategory,
} from '../../observables';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { dataContext } from '../../context/data';
import { CreateGamesPayload } from '../../services/products';
import { Photo } from '@mui/icons-material';
import axios from 'axios';
import { env } from '../../config';


interface FormValues {
  name: string;
  quantity: number;
  price: number;
  offerPrice: number;
  image: string;
  description: string;
}

const CreateModal = () => {
  const categoryIdRef = useRef<number | string | undefined>();

  const [ imgUrl, setImgUrl ] = useState('')

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: '',
      quantity: 0,
      price: 0,
      offerPrice: 0,
      image: '',
      description: '',
    },
  });

  const { products } = useContext(dataContext);

  const { mutateAsync } = useMutation(
    async (payload: CreateGamesPayload) => await products?.createOne(payload),
  );

  useEffect(() => {
    const sub = categoryId$.subscribe((next) => {
      categoryIdRef.current = next;
    });

    return () => sub.unsubscribe();
  }, []);

  const onSubmit = async ({
    description,
    name,
    offerPrice,
    price,
    quantity,
  }: FormValues) => {
    await mutateAsync({
      description,
      image_url: imgUrl,
      name,
      price_offer: offerPrice,
      price,
      quantity,
      category_id: Number(categoryIdRef.current),
    });

    isRefetchProducts$.next(categoryIdRef.current);
    setIsOpenCategory(false);
  };

  const isOpen = useIsOpenCategory();

  const handleChange = async (event: ChangeEvent<HTMLInputElement>)=>{
    const [ file ] = event.target.files ?? []

    const formData = new FormData();

    formData.append('file', file)

    const { data } = await axios.post(`${env.PHOTO_UPLOAD_URL}/index.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }})


    setImgUrl(`${env.PHOTO_UPLOAD_URL}/${data}`)
  }

  return (
    <Dialog open={!!isOpen} onClose={() => setIsOpenCategory(false)}>
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
        <IconButton
          aria-label="upload picture"
          component="label"
          sx={{
            width: '4rem',
            aspectRatio: 1
          }}
        >
          <input hidden type='file' accept='image/*' onChange={handleChange} />
          <Photo />
        </IconButton>
        {
          !!imgUrl && <img height={100} width={50} src={imgUrl} alt='uploaded image'/>
        }
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
              {...register('offerPrice', {
                required: 'El Precio del producto es obligatorio',
              })}
            />
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
