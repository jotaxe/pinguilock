/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');

const server = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/pinguilock.tk/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/pinguilock.tk/cert.pem')
}, app).listen(443);

app.setup(server);


process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>{
  //logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  console.log(`Pinguilock backend server started on http://${app.get('host')}:${port}`);
});
