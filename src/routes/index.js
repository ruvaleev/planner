import { rootPath } from 'helpers/routes';
import Home from '../components/Home';
import NotFound from '../components/NotFound';

import { fetchAreas } from '../redux/slices/areas';
import { fetchTodos } from '../redux/slices/todos';

/* eslint no-sequences: 0 */
export default [
  {
    name: 'home',
    path: rootPath(),
    exact: true,
    component: Home,
    loadData: ({ store }) => (
      store.dispatch(fetchAreas()),
      store.dispatch(fetchTodos())
    ),
  },
  {
    name: 'notFound',
    component: NotFound,
  },
];
