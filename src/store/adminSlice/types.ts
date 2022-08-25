import { IFilter, ITableFilter } from 'types/api';

export type AdminSliceState = {
  accessToken: string;
  loading: boolean;
  error?: any;
  role: string | null;
  twoFactorAdminEnabled: boolean;
  list: any[];
  coins: any[];
  tradingPairs: any[];
  totalCount: number;
  usersFilter: ITableFilter;
  accountsFilter: IFilter;
  userById: any;
};

export type UpdateAccessTokenAction = {
  token: string;
};
export interface IUsersResponseDataProfile {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  firstName: null | string;
  middleName: null | string;
  lastName: null | string;
  dob: null | string;
}

export interface IUsersResponseDataSetting {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  twoFactorAuthEnabled: boolean;
}

export interface IUsersResponseData {
  role: 'ADMIN' | 'USER';
  id: number;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  email: string;
  status: 'ACTIVE' | string;
  deviceToken: string;
  updatedBy: null | any;
  settings: IUsersResponseDataSetting | null;
  profile: IUsersResponseDataProfile | null;
}

export type IFilterPayload =
  | { skip: number }
  | { take: number }
  | { sort: string }
  | { search: string }
  | { order: 'DESC' | 'ASC' }
  | { filter: any };
