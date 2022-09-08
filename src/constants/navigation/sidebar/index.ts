import { Routes } from 'types';
import { AvatarMultipleIcon, ListIcon, BellIcon, DashboardIcon } from 'assets/icons';

import { RoleType } from './../../../types/api/index';

type SidebarNavigationItem = {
  id: number;
  text: string;
  linkTo: Routes;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  admit: string;
};

const sidebarNavigation: SidebarNavigationItem[] = [
  {
    id: 1,
    text: 'dashboard_header',
    Icon: DashboardIcon,
    linkTo: Routes.Dashboard,
    admit: 'ALL',
  },
  {
    id: 2,
    Icon: ListIcon,
    text: 'accounts_header',
    linkTo: Routes.Accounts,
    admit: 'ALL',
  },
  {
    id: 3,
    text: 'users_header',
    linkTo: Routes.Users,
    Icon: AvatarMultipleIcon,
    admit: RoleType.ADMIN,
  },
  {
    id: 4,
    Icon: BellIcon,
    text: 'alerts_header',
    linkTo: Routes.Alerts,
    admit: 'ALL',
  },
];

export default sidebarNavigation;
