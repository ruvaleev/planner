import serverMock from './server';
import browserMock from './browser';
import handlers from './handlers';

async function mocks() {
  if ((typeof window === 'undefined') || (process.env.NODE_ENV === 'test')) {
    const server = serverMock(handlers);
    server.listen();
  } else {
    const worker = browserMock(handlers);

    if (window.location.pathname === '/planner') {
      window.location.pathname = '/planner/';
      return;
    }

    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  }
}

export default mocks;
