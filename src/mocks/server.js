import { setupServer } from 'msw/node';

function serverMock(handlers) {
  return setupServer(...handlers);
}

export default serverMock;
