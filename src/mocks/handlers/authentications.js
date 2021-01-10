import { rest } from 'msw';
import uuid from 'uuid-random';
import qs from 'qs';

const authorizedUser = { email: 'correct@email.com', password: 'password' };

const authorized = (email, password) => (
  email === authorizedUser.email && password === authorizedUser.password
);

const userExists = (email) => email === authorizedUser.email;

const authorizedResponse = (res, ctx) => res(
  ctx.status(200),
  ctx.json({ auth_token: uuid() }),
);

const unauthorizedResponse = (res, ctx) => res(
  ctx.status(401),
  ctx.json({ errors: ['Unauthorized'] }),
);

const forbiddenResponse = (res, ctx) => res(
  ctx.status(403),
  ctx.json({ errors: { email: ['has already been taken'] } }),
);

export default [
  rest.post('http://localhost:4567/auth', (req, res, ctx) => {
    const { email, password } = qs.parse(req.body).user;

    const response = authorized(email, password) ? authorizedResponse : unauthorizedResponse;

    return response(res, ctx);
  }),
  rest.get('http://localhost:4567/auth', (req, res, ctx) => {
    const token = req.url.searchParams.get('token');

    const incorrectToken = 'incorrectToken';

    const response = token === incorrectToken ? unauthorizedResponse : authorizedResponse;

    return response(res, ctx);
  }),
  rest.post('http://localhost:4567/users', (req, res, ctx) => {
    const { email } = qs.parse(req.body).user;

    const response = userExists(email) ? forbiddenResponse : authorizedResponse;

    return response(res, ctx);
  }),
  rest.delete('http://localhost:4567/auth', (req, res, ctx) => res(
    ctx.status(200),
  )),
];
