import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { UsersSliceState } from './types';

const selectUsers = (state: RootState): UsersSliceState => state.users;

export const selectUsersError = createSelector(selectUsers, (users) => users.error);
