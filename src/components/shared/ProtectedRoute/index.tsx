import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Routes } from 'types';
import { useAppSelector } from 'hooks';
import { authSelectors } from 'store/authSlice';
import { i18n } from 'i18';

const ProtectedRoute = ({ children }: any) => {
  const token = useAppSelector(authSelectors.selectToken);
  const isEnglish = useSelector(authSelectors.selectIsEnglish);

  useEffect(() => {
    i18n.changeLanguage(isEnglish ? 'en' : 'ru');
  }, [isEnglish, i18n]);

  if (!token) {
    return <Navigate to={Routes.Login} replace />;
  }

  return children;
};

export default ProtectedRoute;
