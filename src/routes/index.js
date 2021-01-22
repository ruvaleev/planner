import {
  plannerPath, rootPath, signInPath, signUpPath,
} from 'helpers/routes';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import Planner from '../components/Planner';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

import { fetchAreas } from '../redux/slices/areas';
import { verifyAuth } from '../redux/slices/authentications';
import { fetchTodos } from '../redux/slices/todos';

/* eslint no-sequences: 0 */
export default [
  {
    name: 'home',
    path: rootPath(),
    exact: true,
    component: Home,
    loadData: ({ store }) => (
      store.dispatch(verifyAuth)
    ),
  },
  {
    name: 'planner',
    path: plannerPath(),
    exact: true,
    component: Planner,
    loadData: ({ store }) => (
      store.dispatch(fetchAreas()),
      store.dispatch(fetchTodos())
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
