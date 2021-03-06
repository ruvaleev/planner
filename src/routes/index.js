import {
  plannerPath, rootPath, signInPath, signUpPath,
} from 'helpers/routes';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import Planner from '../components/Planner';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

import { fetchAreas } from '../redux/slices/areas';
import { enableDemoMode } from '../redux/slices/authentications';

/* eslint no-sequences: 0 */
export default [
  {
    name: 'home',
    path: rootPath(),
    exact: true,
    component: Home,
    loadData: ({ store, cookies }) => (
      cookies.get('DemoMode?') && store.dispatch(enableDemoMode())
    ),
  },
  {
    name: 'planner',
    path: plannerPath(),
    exact: true,
    component: Planner,
    loadData: ({ store }) => (
      store.dispatch(fetchAreas())
    ),
  },
  {
    name: 'signIn',
    path: signInPath(),
    exact: true,
    component: SignIn,
  },
  {
    name: 'signUp',
    path: signUpPath(),
    exact: true,
    component: SignUp,
  },
  {
    name: 'notFound',
    component: NotFound,
  },
];
