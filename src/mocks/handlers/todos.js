import { rest } from 'msw';
import uuid from 'uuid-random';

export default [
  rest.get('https://api.airtable.com/v0/apppa13MHUBR0nuxP/todos', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      records: [
        {
          id: 'todo_1',
          fields: {
            title: 'Заработать миллион',
            completed: true,
            area_id: ['area_1'],
          },
        },
        {
          id: 'todo_2',
          fields: {
            title: 'Заработать два миллиона',
            completed: false,
            area_id: ['area_1'],
          },
        },
        {
          id: 'todo_3',
          fields: {
            title: 'Заработать три миллиона',
            completed: false,
            area_id: ['area_1'],
          },
        },
      ],
    }),
  )),
  rest.post('https://api.airtable.com/v0/apppa13MHUBR0nuxP/todos', (req, res, ctx) => {
    const { title } = req.body.records[0].fields;
    const areaId = req.body.records[0].fields.area_id[0];

    return res(
      ctx.status(200),
      ctx.json({
        records: [
          {
            id: uuid(),
            fields: {
              title,
              area_id: [areaId],
            },
          },
        ],
      }),
    );
  }),
  rest.delete('https://api.airtable.com/v0/apppa13MHUBR0nuxP/todos', (req, res, ctx) => {
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
  rest.patch('https://api.airtable.com/v0/apppa13MHUBR0nuxP/todos', (req, res, ctx) => {
    const { id } = req.body.records[0];
    const { completed } = req.body.records[0].fields;

    return res(
      ctx.status(200),
      ctx.json({
        records: [
          {
            id,
            fields: {
              completed: !completed,
            },
          },
        ],
      }),
    );
  }),
];