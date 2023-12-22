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
import { setIsEditCategory } from '../observables';
import useToast from './useToast';

interface IUseQueryCategory {
  reset?: () => void;
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
        reset && reset();
      },
    }
  );

  const deleteCategory = useDeleteOne(AsyncProviderNames.CATEGORIES);
  const { mutate: mutateDelete } = useMutation(
    ['delete_category'],
    // @ts-ignore
    async ({category_id, sub_categories}) => {
       // @ts-ignore
      return deleteCategory({category_id, sub_categories});
    },
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries(
          ['all_categories_table'],
           // @ts-ignore
          variables?.category_id
        );
      },
      onError: (error, variables) => {
        // @ts-ignore
        useToast({ message: error?.message, isError: true })
        queryClient.invalidateQueries(
          ['all_categories_table'],
           // @ts-ignore
          variables?.category_id
        );
      }
    },
  );

  const updateCategory = useUpdateOne(AsyncProviderNames.CATEGORIES);
  const { mutate: mutateUpdate } = useMutation(
    ['delete_category'],
    async ({ category_id, name, sub_categories, sub_categories_to_create, sub_categories_to_delete }: ICategory) => {
      return await updateCategory({ category_id, name, sub_categories, sub_categories_to_create, sub_categories_to_delete });
    },
    {
      onSuccess: (_data, variables) => {
        // @ts-ignore
        queryClient.invalidateQueries(
          ['all_categories_table'],
          variables?.category_id
        );
        reset && reset();
        setIsEditCategory(false);
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
