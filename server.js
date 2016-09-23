var express = require('express')
var path = require('path')
var PORT = process.env.PORT || 3000

var app = express()

var http = require('http').Server(app);
var io = require('socket.io')(http);

var routes = require('./routes/index');

app.get('/channel/:name', (req, res) => {
  var channel = req.params.name

  var nsp = io.of(`/${channel}`);

  nsp.on('connection', function(socket){
    console.log('someone connected')
  });
  nsp.emit('hi', 'everyone!');
})

//server setup

routes(io)

http.listen(PORT, function () {
  console.log('Server listening on port: ', PORT)
})

app.use(express.static('public'))
