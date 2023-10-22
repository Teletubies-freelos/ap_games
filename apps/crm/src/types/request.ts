export interface PaginationParams {
  offset?: number;
  limit?: number;
}

export interface QueryManyOptions<T> {
  pagination?: PaginationParams;
  filters?: T;
  sort?: string;
}
