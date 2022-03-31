import Login from '../components/Login';
import UserPage from '../components/UserPage';

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
];

export default routes;
