/* eslint-disable no-console */
const https = require('https');
const fs = require('fs');

const logger = require('./logger');
const app = require('./app');
const port = app.get('port');

const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/pinguilock.tk/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/pinguilock.tk/cert.pem')
}, app).listen(443);

app.setup(httpsServer);

const httpServer = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

httpsServer.on('listening', () =>{
  //logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  console.log(`Pinguilock backend server started on https://${app.get('host')}`);
});

httpServer.on('listening', () =>{
  //logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  console.log(`Pinguilock backend server started on http://${app.get('host')}:${port}`);
});
