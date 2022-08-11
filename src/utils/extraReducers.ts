import { isObject } from 'lodash';

export const pendingReducer = (state: any) => {
  state.loading = true;
  state.error = null;
};

export const errorReducer = (state: any, action: any) => {
  state.loading = false;
  state.error = isObject(state.error)
    ? { ...state.error, ...action.payload.error }
    : action.payload.error;
};
