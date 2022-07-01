import React from 'react';

import { AvatarMultipleIcon, ListIcon, BellIcon, DashboardIcon } from 'icons';
import { Routes } from 'types';

export const navList = [
  {
    id: 1,
    icon: <DashboardIcon />,
    text: 'Dashboard',
    linkTo: Routes.Dashboard,
  },
  {
    id: 2,
    icon: <ListIcon />,
    text: 'Accounts',
    linkTo: Routes.Accounts,
  },
  {
    id: 1,
    icon: <AvatarMultipleIcon />,
    text: 'Users',
    linkTo: Routes.Users,
  },
  {
    id: 1,
    icon: <BellIcon />,
    text: 'Alerts',
    linkTo: Routes.Alerts,
  },
];
