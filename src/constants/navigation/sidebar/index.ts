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
    text: 'dashboard_header',
    Icon: DashboardIcon,
    linkTo: Routes.Dashboard,
  },
  {
    id: 2,
    Icon: ListIcon,
    text: 'accounts_header',
    linkTo: Routes.Accounts,
  },
  {
    id: 3,
    text: 'users_header',
    linkTo: Routes.Users,
    Icon: AvatarMultipleIcon,
  },
  {
    id: 4,
    Icon: BellIcon,
    text: 'alerts_header',
    linkTo: Routes.Alerts,
  },
];

export default sidebarNavigation;
