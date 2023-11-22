import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  useCreateOne,
  useDeleteOne,
  useGetList,
  useUpdateOne,
} from 'data_providers';
import { AsyncProviderNames } from '../types/providers';
import { IDeliveryCosts } from '../services/DeliveryCosts';

interface IUseDeliveryCosts {
  reset?: () => void;
}

export const useDeliveryCosts = ({ reset }: IUseDeliveryCosts) => {
  const queryClient = useQueryClient();

  const getDeliveryCosts = useGetList<IDeliveryCosts>(AsyncProviderNames.DELIVERY_COSTS);
  const queryGet = useQuery(
    ['all_delivery_costs_table'],
    async () => await getDeliveryCosts()
  );

  const createDeliveryCosts = useCreateOne(AsyncProviderNames.DELIVERY_COSTS);
  const { mutateAsync: mutateCreate } = useMutation(
    ['create_delivery_costs'],
    async (data: IDeliveryCosts) => await createDeliveryCosts(data),
    {
      onSuccess: (newDeliveryCost) => {
        queryClient.invalidateQueries(
          ['all_delivery_costs_table'],
          newDeliveryCost?.delivery_costs_id
        );
        reset && reset();
      },
    }
  );

  const deleteDeliveryCosts = useDeleteOne(AsyncProviderNames.DELIVERY_COSTS);
  const { mutate: mutateDelete } = useMutation(
    ['delete_delivery_costs'],
    async (delivery_costs_id: number) => {
        deleteDeliveryCosts(delivery_costs_id);
    },
    {
      onSuccess: (_data, variables) => {
        queryClient.setQueryData<IDeliveryCosts[]>(
          ['all_delivery_costs_table'],
          (prevCategories) =>
            prevCategories?.filter(
              (category) => category.delivery_costs_id !== variables
            )
        );
      },
    }
  );

  const updateDeliveryCosts = useUpdateOne(AsyncProviderNames.DELIVERY_COSTS);
  const { mutate: mutateUpdate } = useMutation(
    ['delete_delivery_costs'],
    async (payload: IDeliveryCosts) => {
      return await updateDeliveryCosts(payload);
    },
    {
      onSuccess: (_data, variables) => {
        queryClient.setQueryData<IDeliveryCosts[]>(
          ['all_delivery_costs_table'],
          (prevDeliveryCosts) =>
          prevDeliveryCosts?.map((deliveryCosts) =>
            deliveryCosts.delivery_costs_id === variables.delivery_costs_id
                ? variables
                : deliveryCosts
            )
        );
        reset && reset();
        //setIsEditCategory(false);
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
