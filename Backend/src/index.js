/* eslint-disable no-console */
const https = require('https');
const http = require('http')
const fs = require('fs');

const logger = require('./logger');
const app = require('./app');
const httpApp = require('./httpApp');
const port = app.get('port');

const opt = {
  key: fs.readFileSync('/etc/letsencrypt/live/pinguilock.tk/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/pinguilock.tk/cert.pem')
}
const server = https.createServer(opt, app).listen(443);
const httpServ = http.createServer(httpApp).listen(3030);
httpApp.setup(httpServ);
app.setup(server)




process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>{
  //logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  console.log(`Pinguilock backend server started on https://${app.get('host')}`);
});

