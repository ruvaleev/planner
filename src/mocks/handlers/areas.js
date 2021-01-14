import { rest } from 'msw';
import uuid from 'uuid-random';

import { defaultAreas } from '../../tests/shared/AreasReducerGenerator';

export default [
  rest.get('https://api.airtable.com/v0/apppa13MHUBR0nuxP/areas', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      records: defaultAreas,
    }),
  )),
  rest.post('https://api.airtable.com/v0/apppa13MHUBR0nuxP/areas', (req, res, ctx) => {
    const { title } = req.body.records[0].fields;

    return res(
      ctx.status(200),
      ctx.json({
        records: [
          {
            id: uuid(),
            fields: {
              title,
              completed_todos_count: 0,
              todos_count: 0,
              todos: [],
            },
          },
        ],
      }),
    );
  }),
  rest.delete('https://api.airtable.com/v0/apppa13MHUBR0nuxP/areas', (req, res, ctx) => {
    const id = req.url.searchParams.get('records[]');

    return res(
      ctx.status(200),
      ctx.json({
        records: [
          {
            deleted: true,
            id,
          },
        ],
      }),
    );
  }),
];
