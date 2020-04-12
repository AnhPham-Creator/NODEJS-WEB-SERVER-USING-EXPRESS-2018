const express = require('express')
const app = express()

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
    res.sendFile('chat.html', { root: '.' });
});

var users = [];
//var room = 1;
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.emit('connect');
   socket.on('setUsername', function(data) {
      if(users.indexOf(data) === -1) {
         users.push(data);
         //socket.join("room-"+roomno);
         io.sockets.emit('connectToRoom', { username: data });
         socket.emit('userSet', { username: data });
      } else {
         socket.emit('userExists', data + ' is taken! Try some other username.');
      }
   })
   socket.on('msg', function(data){
       //socket.emit('newmsg', data)
       io.sockets.emit('newmsg', data);
   })

   socket.on('leaveroom', function(data) {
     let user = data.user;
     users.splice(users.indexOf(user),1);
     socket.emit('leaveroom');
     io.sockets.emit('notifileaveroom', user)
   })
});