import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { AuthSliceState } from './types';

const selectAuth = (state: RootState): AuthSliceState => state.auth;

export const selectRole = createSelector(selectAuth, (auth) => auth.role);
export const selectAuthError = createSelector(selectAuth, (auth) => auth.error);
export const selectLoading = createSelector(selectAuth, (auth) => auth.loading);
export const selectTwoFactorAuthEnabled = createSelector(
  selectAuth,
  (auth) => auth.twoFactorAuthEnabled,
);
export const selectIsDarkMode = createSelector(selectAuth, (auth) => auth.isDarkMode);
export const selectToken = createSelector(selectAuth, (auth) => auth.accessToken);
export const selectIsEnglish = createSelector(selectAuth, (auth) => auth.isEnglish);
export const selectPersonalInfo = createSelector(selectAuth, (auth) => auth.personalInfo);
