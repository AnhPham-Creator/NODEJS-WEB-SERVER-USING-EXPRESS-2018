const express = require('express')
const app = express()
// const port = 3000

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

// app.get('/', (req, res) => res.send('Hello World!'))

//app.use(express.static('public'))

app.get('/', function (req, res) {
    //res.sendFile('text.txt', { root: './public/' });
    res.sendFile('index2.html', { root: '.' });
});

// app.get('/news', function (req, res) {
//     //res.sendFile('text.txt', { root: './public/' });
//     res.sendFile('index2.html', { root: '.' });
// });
  
// io.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });
var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
    socket.on('hi!', function(data) {
        console.log(data)
    })
  });

var news = io
  .of('/news')
  .on('connection', function (socket) {
    console.log('connecting');
    socket.emit('item', { news: 'item' });
    socket.on('woot', function(data) {
        console.log(data)
    })
  });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))