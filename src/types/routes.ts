export type RoutesProps = {
  path: string;
  component: JSX.Element;
  text: string;
  withHeader?: boolean;
  withSidebar?: boolean;
  isBackBtn?: boolean;
};

export enum Routes {
  SignIn = '/',
  Error = '*',
  AddNewUser = '/add-new-user',
  Dashboard = '/dashboard',
  Accounts = '/accounts',
  Alerts = '/alerts',
  Users = '/users',
}
