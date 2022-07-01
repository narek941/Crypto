import { RoutesProps, Routes } from '../types';
import {
  ErrorContainer,
  AlertsContainer,
  DashboardContainer,
  SignInContainer,
  AddNewUserContainer,
  UsersContainer,
  AccountsContainer,
} from '../containers';

const routesList: RoutesProps[] = [
  {
    path: Routes.SignIn,
    text: 'Sign in',
    component: <SignInContainer />,
    withHeader: false,
  },
  {
    path: Routes.AddNewUser,
    text: 'Users management',
    component: <AddNewUserContainer />,
    isBackBtn: true,
  },
  {
    path: Routes.Error,
    text: 'Error',
    component: <ErrorContainer />,
  },
  {
    path: Routes.Dashboard,
    text: 'Dashboard',

    component: <DashboardContainer />,
  },
  {
    path: Routes.Alerts,
    text: 'Alerts',

    component: <AlertsContainer />,
  },
  {
    path: Routes.Users,
    text: 'Users',

    component: <UsersContainer />,
  },
  {
    path: Routes.Accounts,
    text: 'Accounts',

    component: <AccountsContainer />,
  },
];

export default routesList;
