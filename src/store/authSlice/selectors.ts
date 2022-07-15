import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { AuthSliceState } from './types';

const selectAuth = (state: RootState): AuthSliceState => state.auth;

export const selectAuthError = createSelector(selectAuth, (auth) => auth.error);
export const selectToken = createSelector(selectAuth, (auth) => auth.accessToken);
export const selectRole = createSelector(selectAuth, (auth) => auth.role);
