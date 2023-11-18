export type IOrder = "asc" | "desc";

export type IPagination = {
  perPage: number;
  totalPage: number;
  pageIndex: number;
  order: IOrder;
  orderBy: string;
  handleRequestSort: (property: string) => () => void;
  changePage: (value: number) => void;
  changePerPage: (value: number) => void;
};