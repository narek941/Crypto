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
  AddNewUser = '/add-new-user',
  AddNewAccount = '/add-new-account',
  AccountsAnalytics = 'accounts-analytics',
}
