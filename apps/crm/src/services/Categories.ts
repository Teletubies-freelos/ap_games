import { GraphQLClient } from 'graphql-request';
import { GET_CATEGORIES, GET_CATEGORIES_DELIVERY_COSTS, GET_CATEGORIES_PRODUCTS, GET_SUB_CATEGORIES_DELIVERY_COSTS, GET_SUB_CATEGORIES_PRODUCTS } from '../../../request/src/graphql/queries';
import {
  CREATE_CATEGORY,
  CREATE_SUB_CATEGORY,
  DELETE_CATEGORY,
  DELETE_SUB_CATEGORY,
  UPDATE_CATEGORY,
} from '../../../request/src/graphql/mutations';
import { IDataProvider } from 'data_providers';

export interface ICategory {
  category_id: number;
  name: string;
  sub_categories?: ISubCategory[];
  sub_categories_to_create?: ISubCategory[];
  sub_categories_to_delete?: ISubCategory[];
}

export interface ISubCategory {
  sub_category_id: number;
  category_id: number;
  name: string;
}
export class CategoriesData implements IDataProvider {
  constructor(private client: GraphQLClient) { }

  async getList(): Promise<ICategory[]> {
    const { categories_aggregate: categories } = await this.client.request<{
      categories_aggregate: any;
    }>(GET_CATEGORIES);

    return categories?.nodes;
  }

  async deleteOne(payload: any) {
    // @ts-ignore
    const availableSubCategoriesToDelete = await this.existsSubCategoriesInDB(payload.sub_categories?.map(({ sub_category_id }) => (sub_category_id)) ?? []);

    if (availableSubCategoriesToDelete.length >= 0) {
      const { delete_sub_categories } = await this.client.request<{ delete_sub_categories: any; }>(DELETE_SUB_CATEGORY, {
        subCategoryIds: availableSubCategoriesToDelete
      });
      console.log("🚀 ~ file: Categories.ts:42 ~ CategoriesData ~ deleteOne ~ delete_sub_categories:", delete_sub_categories)

    }


    if (payload.sub_categories.length <= availableSubCategoriesToDelete.length) {
      const availableCategoriesToDelete = await this.existsCategoriesInDB(payload.category_id);
      if (availableCategoriesToDelete.length >= 0) {
        const { delete_categories_by_pk } = await this.client.request<{
          delete_categories_by_pk: ICategory;
        }>(DELETE_CATEGORY, { category_id: payload.category_id });
        return delete_categories_by_pk;
      }
    }

    throw new Error("No se pudo eliminar la categoría, porfavor verificar que no existe un producto asociado o un costo de envío")
  }

  async createOne(payload: ICategory) {
    const { insert_categories_one } = await this.client.request<{
      insert_categories_one: ICategory;
    }>(CREATE_CATEGORY, { name: payload.name });

    return insert_categories_one;
  }

  async updateOne(payload: ICategory) {

    // Update Category Name
    const { update_categories_by_pk } = await this.client.request<{
      update_categories_by_pk: ICategory;
    }>(UPDATE_CATEGORY, {
      category_id: payload.category_id,
      name: payload.name,
    });

    if (payload.sub_categories_to_delete && payload.sub_categories_to_delete?.length > 0) {
      const availableSubCategoriesToDelete = await this.existsSubCategoriesInDB(payload.sub_categories_to_delete?.map(({ sub_category_id }) => (sub_category_id)) ?? []);
      // Delete and Create unused subCategories
      const { delete_sub_categories } = await this.client.request<{ delete_sub_categories: any; }>(DELETE_SUB_CATEGORY, {
        subCategoryIds: availableSubCategoriesToDelete
      });
      console.log("🚀 ~ file: Categories.ts:68 ~ CategoriesData ~ updateOne ~ delete_sub_categories:", delete_sub_categories)
    }
    if (payload.sub_categories_to_create) {
      const { insert_sub_categories } = await this.client.request<{
        insert_sub_categories: any;
      }>(CREATE_SUB_CATEGORY, {
        objects: payload.sub_categories_to_create
      });
      console.log("🚀 ~ file: Categories.ts:65 ~ CategoriesData ~ updateOne ~ insert_sub_categories:", insert_sub_categories)
    }

    return update_categories_by_pk;
  }

  async existsSubCategoriesInDB(subCategoryId: number[]) {
    const { products } = await this.client.request<{
      products: [{ product_id: number, sub_category_id: number }];
    }>(GET_SUB_CATEGORIES_PRODUCTS, { subCategoryId });

    const { delivery_costs_detail } = await this.client.request<{
      delivery_costs_detail: [{ delivery_costs_detail_id: number, sub_category_id: number }];
    }>(GET_SUB_CATEGORIES_DELIVERY_COSTS, { subCategoryId });

    const existingProductSubCategoryIds = products.map((product) => product.sub_category_id);
    const existingDeliveryCostSubCategoryIds = delivery_costs_detail.map((detail) => detail.sub_category_id);

    // Identify subcategories that don't exist in both data sets
    const nonExistingSubCategories = subCategoryId.filter(
      (subCategoryId) =>
        !existingProductSubCategoryIds.includes(subCategoryId) &&
        !existingDeliveryCostSubCategoryIds.includes(subCategoryId)
    );

    console.log("Non-existing Subcategories:", nonExistingSubCategories);

    // Return the result or perform further actions as needed
    return nonExistingSubCategories;
  }
  async existsCategoriesInDB(categoryId: number) {
    const { products } = await this.client.request<{
      products: [{ product_id: number, category_id: number }];
    }>(GET_CATEGORIES_PRODUCTS, { categoryId });

    const { delivery_costs_detail } = await this.client.request<{
      delivery_costs_detail: [{ delivery_costs_detail_id: number, category_id: number }];
    }>(GET_CATEGORIES_DELIVERY_COSTS, { categoryId });

    const existingProductCategoryIds = products.map((product) => product.category_id);
    const existingDeliveryCostCategoryIds = delivery_costs_detail.map((detail) => detail.category_id);

    // Identify subcategories that don't exist in both data sets
    const nonExistingSubCategories = [categoryId].filter(
      (categoryId) =>
        !existingProductCategoryIds.includes(categoryId) &&
        !existingDeliveryCostCategoryIds.includes(categoryId)
    );

    console.log("Non-existing Subcategories:", nonExistingSubCategories);

    // Return the result or perform further actions as needed
    return nonExistingSubCategories;
  }
}
