export type Paginated<T> = {
  data: T[];
  currentPage: number;
  numberOfPages: number;
  itemsCount: number;
  limit: number;
};
