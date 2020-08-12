const { isObject } = require('util');
const { Socket } = require('dgram');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user is connected');
  socket.on('chat message', (msg) => {
    // console.log('message: ' + JSON.stringify(msg));
    io.emit('chat message', msg);
  });
})

http.listen(3002, () => {
  console.log('listening on *:3002');
});