import { SerializedError } from '@reduxjs/toolkit';

import { IFilter } from 'types/api';

import { AdminStates } from './constants';

export type AdminSliceState = {
  accessToken: string;
  loading: AdminStates;
  error?: SerializedError | null;
  role: string | null;
  twoFactorAdminEnabled: boolean;
  list?: any[];
  totalCount: number;
  filter: IFilter;
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
