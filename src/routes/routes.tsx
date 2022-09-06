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
    text: 'login_header',
    component: <SignIn />,
    withHeader: false,
  },
  {
    path: Routes.AddNewUser,
    text: 'users_settings_header',
    isProtected: true,
    component: <AddNewUser />,
    isBackBtn: true,
  },
  {
    path: `${Routes.EditUser}/:id`,
    text: 'users_settings_header',
    isProtected: true,
    component: <AddNewUser />,
    isBackBtn: true,
  },
  {
    path: `${Routes.Accounts}/analytics/:id`,
    text: 'accounts_analytics_header',
    isProtected: true,
    isBackBtn: true,
    component: <AccountsAnalytics />,
    withMail: true,
    to: Routes.Accounts,
  },
  {
    path: Routes.AddNewAccount,
    text: 'accounts_settings_header',
    isProtected: true,
    component: <AddNewAccount />,
    isBackBtn: true,
  },
  {
    path: `${Routes.EditAccount}/:id`,
    text: 'accounts_settings_header',
    isProtected: true,
    component: <AddNewAccount />,
    isBackBtn: true,
  },
  {
    path: Routes.Dashboard,
    text: 'dashboard_header',
    isProtected: true,
    component: <Dashboard />,
  },
  {
    path: Routes.Alerts,
    text: 'alerts_header',
    isProtected: true,
    component: <Alerts />,
  },
  {
    path: Routes.Users,
    text: 'users_header',
    isProtected: true,
    component: <Users />,
  },
  {
    path: Routes.Accounts,
    text: 'accounts_header',
    isProtected: true,
    component: <Accounts />,
  },
  {
    path: Routes.Error,
    text: 'error_header',
    withHeader: false,
    component: <Error />,
  },
];

export default routes;
