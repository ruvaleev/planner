import Express from 'express';
import Rollbar from 'rollbar';

import handleRender from './handleRender';

const rollbar = new Rollbar(process.env.ROLLBAR_SERVER_ITEM_ACCESS_TOKEN);

const app = Express();
const port = process.env.PORT || 3000;

// Serve static files
app.use('/assets', Express.static('./dist/assets/'));

// Use the rollbar error handler to send exceptions to your rollbar account
app.use(rollbar.errorHandler());

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow

/* eslint no-console: 0 */
app.listen(port, '0.0.0.0', () => console.log('App is listening on', port));
