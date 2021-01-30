import { rest } from 'msw';
import qs from 'qs';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const authorizedUser = { email: 'correct@email.com', password: 'password' };

const authorized = (email, password) => (
  email === authorizedUser.email && password === authorizedUser.password
);

const userExists = (email) => email === authorizedUser.email;

const authorizedResponse = (res, ctx) => res(
  ctx.status(200),
);

const authorizedResponseWithCookie = (res, ctx) => res(
  ctx.cookie('Authorized?', 'true'),
  ctx.status(200),
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

    const response = authorized(email, password)
      ? authorizedResponseWithCookie
      : unauthorizedResponse;

    return response(res, ctx);
  }),
  rest.post('http://localhost:4567/auth/demo', (req, res, ctx) => authorizedResponseWithCookie(res, ctx)),
  rest.get('http://localhost:4567/auth', (req, res, ctx) => {
    const isAuthorized = cookies.get('Authorized?') === 'true';

    const response = isAuthorized ? authorizedResponse : unauthorizedResponse;

    return response(res, ctx);
  }),
  rest.post('http://localhost:4567/users', (req, res, ctx) => {
    const { email } = qs.parse(req.body).user;

    const response = userExists(email) ? forbiddenResponse : authorizedResponseWithCookie;

    return response(res, ctx);
  }),
  rest.delete('http://localhost:4567/auth', (_req, res, ctx) => res(
    ctx.status(200),
  )),
];
