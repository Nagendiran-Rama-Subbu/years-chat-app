
/**
 * Module dependencies.
 */
const http = require('http');

const app = require('./app.js');
const Server = require("socket.io").Server;
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3008;

const httpServer = http.createServer(app);

httpServer.listen(port, function () {
  console.log(`Server is running at http://localhost:${port}`)
});

const io = new Server(httpServer,
  {
    cors: '*'
  });


  // io.on("connection", socket => socketManager(socket, io, redisClient));
  
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('userdata', (data) => {
    console.log(data);
  });
});