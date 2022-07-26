import { Routes } from 'types';
import { AvatarMultipleIcon, ListIcon, BellIcon, DashboardIcon } from 'assets/icons';

type SidebarNavigationItem = {
  id: number;
  text: string;
  linkTo: Routes;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const sidebarNavigation: SidebarNavigationItem[] = [
  {
    id: 1,
    text: 'Dashboard',
    Icon: DashboardIcon,
    linkTo: Routes.Dashboard,
  },
  {
    id: 2,
    Icon: ListIcon,
    text: 'Accounts',
    linkTo: Routes.Accounts,
  },
  {
    id: 3,
    text: 'Users',
    linkTo: Routes.Users,
    Icon: AvatarMultipleIcon,
  },
  {
    id: 4,
    Icon: BellIcon,
    text: 'Alerts',
    linkTo: Routes.Alerts,
  },
];

export default sidebarNavigation;
