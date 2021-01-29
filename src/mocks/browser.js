import { setupWorker, rest } from 'msw';

function browserMock(handlers) {
  const worker = setupWorker(...handlers);
  window.msw = { worker, rest };

  return worker;
}

export default browserMock;
