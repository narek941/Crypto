export type MutateData = () => void;

export interface ICommonRequestReturn {
  isError: boolean;
  isLoading: boolean;
}

export interface IFilter {
  skip: number;
  take: number;
  sort: string;
  search: string;
  order: 'DESC' | 'ASC';
}
