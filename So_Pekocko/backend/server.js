/* ### Create server ### */

const http = require('http'); /*imports the "http" package*/
const app = require('./app'); /*imports the "express" app*/

/*the function "normalizePort" returns a valid port, whether it is given as a number or a string*/
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000'); /* returns a valid port in the correct form*/
app.set('port', port);

/*The function "errorHandler" manages errors appropriately. This function is recorded in the server*/
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);/* the function "app" will be called each time a request is made to the server*/

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port); /* the server is listening to "port", defined L18 using the function normalizePort*/