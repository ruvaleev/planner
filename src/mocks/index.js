import worker from './browser';

async function mocks() {
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

export default mocks;
