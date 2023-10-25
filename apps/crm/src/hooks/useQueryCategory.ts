import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  useCreateOne,
  useDeleteOne,
  useGetList,
  useUpdateOne,
} from 'data_providers';
import { ICategoryName } from '../pages/categories/ListCategories';
import { AsyncProviderNames } from '../types/providers';
import { ICategory } from '../services/Categories';
import { setIsEdit } from '../observables';

interface IUseQueryCategory {
  reset: () => void;
}

export const useQueryCategory = ({ reset }: IUseQueryCategory) => {
  const queryClient = useQueryClient();

  const getCategories = useGetList<ICategory>(AsyncProviderNames.CATEGORIES);
  const queryGet = useQuery(
    ['all_categories_table'],
    async () => await getCategories()
  );

  const createCategory = useCreateOne(AsyncProviderNames.CATEGORIES);
  const { mutateAsync: mutateCreate } = useMutation(
    ['create_category'],
    async (data: ICategoryName) => await createCategory(data),
    {
      onSuccess: (newCategory) => {
        queryClient.invalidateQueries(
          ['all_categories_table'],
          newCategory?.category_id
        );
        reset();
      },
    }
  );

  const deleteCategory = useDeleteOne(AsyncProviderNames.CATEGORIES);
  const { mutate: mutateDelete } = useMutation(
    ['delete_category'],
    async (category_id: number) => {
      deleteCategory(category_id);
    },
    {
      onSuccess: (_data, variables) => {
        queryClient.setQueryData<ICategory[]>(
          ['all_categories_table'],
          (prevCategories) =>
            prevCategories?.filter(
              (category) => category.category_id !== variables
            )
        );
      },
    }
  );

  const updateCategory = useUpdateOne(AsyncProviderNames.CATEGORIES);
  const { mutate: mutateUpdate } = useMutation(
    ['delete_category'],
    async ({ category_id, name }: ICategory) => {
      return await updateCategory({ category_id, name });
    },
    {
      onSuccess: (_data, variables) => {
        queryClient.setQueryData<ICategory[]>(
          ['all_categories_table'],
          (prevCategories) =>
            prevCategories?.map((category) =>
              category.category_id === variables.category_id
                ? variables
                : category
            )
        );
        reset();
        setIsEdit(false);
      },
    }
  );

  return {
    ...queryGet,
    mutateCreate,
    mutateDelete,
    mutateUpdate,
  };
};
