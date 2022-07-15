import {
  Error,
  Users,
  SignIn,
  Alerts,
  Accounts,
  Dashboard,
  AddNewUser,
  AddNewAccount,
  AccountsAnalytics,
} from '../containers';
import { RoutesProps, Routes } from '../types';

const routes: RoutesProps[] = [
  {
    path: Routes.Login,
    text: 'Sign in',
    component: <SignIn />,
    withHeader: false,
  },
  {
    path: Routes.AddNewUser,
    text: 'Users management',
    isProtected: true,
    component: <AddNewUser />,
    isBackBtn: true,
  },
  {
    path: Routes.AddNewAccount,
    text: 'Account settings',
    isProtected: true,
    component: <AddNewAccount />,
    isBackBtn: true,
  },
  {
    path: Routes.Dashboard,
    text: 'Dashboard',
    isProtected: true,
    component: <Dashboard />,
  },
  {
    path: Routes.Alerts,
    text: 'Alerts',
    isProtected: true,
    component: <Alerts />,
  },
  {
    path: Routes.Users,
    text: 'Users',
    isProtected: true,
    component: <Users />,
  },
  {
    path: Routes.Accounts,
    text: 'Accounts',
    isProtected: true,
    component: <Accounts />,
  },
  {
    path: Routes.AccountsAnalytics,
    text: 'Accounts settings',
    isProtected: true,
    component: <AccountsAnalytics />,
  },
  {
    path: Routes.Error,
    text: 'Error',
    withHeader: false,
    component: <Error />,
  },
];

export default routes;
