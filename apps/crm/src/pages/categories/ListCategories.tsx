import MaterialReactTable from 'material-react-table';
import { ICategory, ListColumns } from './Columns';
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useQueryCategory } from '../../hooks/useQueryCategory';
import { useRef, useState } from 'react';
import { setIsEditCategory, useIsEditCategory } from '../../observables';

export interface ICategoryName {
  name: string;
}

const ListCategories = () => {
  const list = ListColumns;

  const { register, handleSubmit, reset, setValue } = useForm<ICategory>();
  const { data, isFetching, mutateCreate, mutateDelete, mutateUpdate } =
    useQueryCategory({ reset });

  const isEdit = useIsEditCategory();
  const [editId, setEditId] = useState<number>(0);

  const nameFieldRef = useRef<HTMLInputElement>(null);

  const onSubmit = async ({ name }: ICategoryName) => {
    if (!isEdit) {
      return await mutateCreate({ name });
    }
    return mutateUpdate({ name, category_id: editId });
  };

  return (
    <Box sx={{ padding: '1rem' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ padding: '1rem' }} gap='1rem'>
          <TextField
            label='Nombre de la categoria'
            {...register('name')}
            inputRef={nameFieldRef}
          />
          <Button variant='contained' type='submit'>
            {isEdit ? 'Editar Categoria' : 'Crear Categoria'}
          </Button>
        </Stack>
      </form>
      <MaterialReactTable
        columns={list()}
        data={data ?? []}
        enableStickyHeader
        muiTableContainerProps={{
          sx: {
            maxHeight: '75vh',
          },
        }}
        enableRowActions
        renderRowActions={({ row }) => (
          <Box display='flex'>
            <IconButton
              color='secondary'
              onClick={() => {
                setValue('name', row.original.name);
                if (nameFieldRef.current) {
                  nameFieldRef.current.focus();
                  setIsEditCategory(true);
                  setEditId(row.original.category_id);
                }
              }}
            >
              <Edit />
            </IconButton>
            <IconButton onClick={() => mutateDelete(row.original.category_id)}>
              <Delete color='error' />
            </IconButton>
          </Box>
        )}
        state={{ isLoading: isFetching }}
      />
    </Box>
  );
};

export default ListCategories;
