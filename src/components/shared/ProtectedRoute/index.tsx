import { Navigate } from 'react-router-dom';

import { Routes } from 'types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { authSelectors } from 'store/authSlice';
import { usersSelectors } from 'store/usersSlice';
import { userInfoRequest } from 'store/usersSlice/thunks';

const ProtectedRoute = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(authSelectors.selectToken);
  const personalInfo = useAppSelector(usersSelectors.selectPersonalInfo);

  if (!token) {
    return <Navigate to={Routes.Login} replace />;
  }
  if (token && !personalInfo) {
    dispatch(userInfoRequest({}));
  }

  return children;
};

export default ProtectedRoute;
