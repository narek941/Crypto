export type RoutesProps = {
  path: string;
  text: string;
  isBackBtn?: boolean;
  withHeader?: boolean;
  isProtected?: boolean;
  component: JSX.Element;
};

export enum Routes {
  Error = '*',
  Default = '#',
  Dashboard = '/',
  Users = '/users',
  Login = '/login',
  Alerts = '/alerts',
  Accounts = '/accounts',
  EditUser = '/users/edit',
  AddNewUser = '/users/create',
  AddNewAccount = '/accounts/create',
  EditAccount = '/accounts/edit',
}

export type ParamsWithId = {
  id: string;
};
