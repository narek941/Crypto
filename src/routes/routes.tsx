import {
  ErrorContainer,
  UsersContainer,
  SignInContainer,
  AlertsContainer,
  AccountsContainer,
  DashboardContainer,
  AddNewUserContainer,
  AccountsAnalyticsContainer,
} from '../containers';
import { RoutesProps, Routes } from '../types';

const routes: RoutesProps[] = [
  {
    path: Routes.Login,
    text: 'Sign in',
    component: <SignInContainer />,
    withHeader: false,
  },
  {
    path: Routes.AddNewUser,
    text: 'Users management',
    isProtected: true,
    component: <AddNewUserContainer />,
    isBackBtn: true,
  },
  {
    path: Routes.Dashboard,
    text: 'Dashboard',
    isProtected: true,
    component: <DashboardContainer />,
  },
  {
    path: Routes.Alerts,
    text: 'Alerts',
    isProtected: true,
    component: <AlertsContainer />,
  },
  {
    path: Routes.Users,
    text: 'Users',
    isProtected: true,
    component: <UsersContainer />,
  },
  {
    path: Routes.Accounts,
    text: 'Accounts',
    isProtected: true,
    component: <AccountsContainer />,
  },
  {
    path: Routes.AccountsAnalytics,
    text: 'Accounts settings',
    isProtected: true,
    component: <AccountsAnalyticsContainer />,
  },
  {
    path: Routes.Error,
    text: 'Error',
    withHeader: false,
    component: <ErrorContainer />,
  },
];

export default routes;
