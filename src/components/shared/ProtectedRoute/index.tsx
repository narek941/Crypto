import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Routes } from 'types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { authSelectors } from 'store/authSlice';
import { usersSelectors } from 'store/usersSlice';
import { userInfoRequest } from 'store/usersSlice/thunks';
import { i18n } from 'i18';

const ProtectedRoute = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(authSelectors.selectToken);
  const personalInfo = useAppSelector(usersSelectors.selectPersonalInfo);
  const isEnglish = useSelector(authSelectors.selectIsEnglish);

  useEffect(() => {
    i18n.changeLanguage(isEnglish ? 'en' : 'ru');
  }, [isEnglish]);

  if (!token) {
    return <Navigate to={Routes.Login} replace />;
  }
  if (token && !personalInfo) {
    dispatch(userInfoRequest({}));
  }

  return children;
};

export default ProtectedRoute;
