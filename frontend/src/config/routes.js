import Login from '../components/Login';
import UserPage from '../components/UserPage';
import AllUsers from '../components/user-components/AllUsers';

// NEED TO ADD MORE DEPENDING ON ALL OUR ROUTES
const routes = [
  {
    path: '/',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/user',
    component: UserPage,
    isPrivate: true,
  },
  {
    path: '/people',
    component: AllUsers,
    isPrivate: true,
  },
];

export default routes;
