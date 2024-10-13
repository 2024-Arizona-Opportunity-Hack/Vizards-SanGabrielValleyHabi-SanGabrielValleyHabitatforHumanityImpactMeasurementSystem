import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import DataTables from 'views/admin/dataTables';
import Logout from 'views/auth/logout';
import Survey1 from 'views/admin/survey1';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Volunteer Survey',
    layout: '/admin',
    path: '/survey1',
    icon: (
      <Icon as={MdPerson} width="20px" height="20px" color="inherit" />
    ),
    component: <Survey1 />,
    secondary: true,
  },
  {
    name: 'Profile',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'Logout',
    layout: '/auth',
    path: '/logout',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <Logout />,
  },
];

export default routes;
