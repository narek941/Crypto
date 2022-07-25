import { Navigate } from 'react-router-dom';

import { Routes } from 'types';
import { useAppSelector } from 'hooks';
import { authSelectors } from 'store/authSlice';

const PublicRoute = ({ children }: any) => {
  const token = useAppSelector(authSelectors.selectToken);

  if (token) {
    return <Navigate to={Routes.Accounts} replace />;
  }

  return children;
};

export default PublicRoute;
