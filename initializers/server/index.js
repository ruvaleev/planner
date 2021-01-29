import Express from 'express';

import handleRender from './handleRender';

const app = Express();
const port = 3000;

// Serve static files
app.use('/assets', Express.static('./dist/assets/'));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow

/* eslint no-console: 0 */
app.listen(port, () => console.log('App is listening on', port));
