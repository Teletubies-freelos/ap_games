import { Button, Stack, TextField } from '@mui/material';
import { Authenticated } from '../../components/authenticated';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { dataContext } from '../../context/data';
import { isRefetchCategories$ } from '../../observables';
import CreateModal from '../../components/modals/CreateModal';
import List from '../../components/categories/List';

interface ICategory {
  name: string;
}

export default function Categories() {
  const { register, handleSubmit } = useForm<ICategory>();
  const { categories } = useContext(dataContext);
  const { mutateAsync } = useMutation(
    async (payload: string) => await categories?.createOne(payload),
  );

  const onSubmit = async (data: ICategory) => {
    await mutateAsync(data.name);
    isRefetchCategories$.next(undefined);
  };

  return (
    <Authenticated>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ padding: '1rem' }} gap='1rem'>
          <TextField label='Nombre de la categoria' {...register('name')} />
          <Button variant='contained' type='submit'>
            Agregar Categoria
          </Button>
        </Stack>
      </form>
      <List />
      <Stack>
        <CreateModal />
      </Stack>
    </Authenticated>
  );
}
