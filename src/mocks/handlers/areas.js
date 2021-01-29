import { rest } from 'msw';
import uuid from 'uuid-random';
import qs from 'qs';

import { defaultAreas } from '../../tests/shared/AreasReducerGenerator';

export default [
  rest.get('http://localhost:4567/areas', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      areas: defaultAreas,
    }),
  )),
  rest.post('http://localhost:4567/areas', (req, res, ctx) => {
    const { title } = qs.parse(req.body).area;

    return res(
      ctx.status(200),
      ctx.json({
        area: {
          id: uuid(),
          title,
          created_at: new Date(),
          todos: [],
        },
      }),
    );
  }),
  rest.delete('http://localhost:4567/areas/:id', (req, res, ctx) => res(
    ctx.status(200),
  )),
  rest.post('http://localhost:4567/todos', (req, res, ctx) => {
    const { todo } = qs.parse(req.body);

    return res(
      ctx.status(200),
      ctx.json({
        todo: {
          id: uuid(),
          title: todo.title,
          completed: false,
          created_at: new Date(),
        },
      }),
    );
  }),
  rest.patch('http://localhost:4567/todos/:id', (req, res, ctx) => res(
    ctx.status(200),
  )),
  rest.delete('http://localhost:4567/todos/:id', (req, res, ctx) => res(
    ctx.status(200),
  )),
];
