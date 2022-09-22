import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Routes } from 'types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { authActions, authSelectors } from 'store/authSlice';
import { i18n } from 'i18';
import { userInfoRequest } from 'store/authSlice/thunks';
import { StatusType } from 'types/api';

const ProtectedRoute = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(authSelectors.selectToken);
  const personalInfo = useAppSelector(authSelectors.selectPersonalInfo);
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

  if (personalInfo?.status === StatusType.BLOCKED || personalInfo?.status === StatusType.DELETED) {
    dispatch(authActions.signOut());
    return <Navigate to={Routes.Login} replace />;
  }

  return children;
};

export default ProtectedRoute;
