import { Navigate } from 'react-router-dom';

import { Routes } from 'types';
import { useAppSelector } from 'hooks';
import { authSelectors } from 'store/authSlice';

const ProtectedRoute = ({ children }: any) => {
  const token = useAppSelector(authSelectors.selectToken);

  if (!token) {
    return <Navigate to={Routes.Login} replace />;
  }

  return children;
};

export default ProtectedRoute;
