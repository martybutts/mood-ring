var express = require('express')
var path = require('path')
// var data = require('./index.js');
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

var routes = require('./routes/index');

//server setup
var PORT = process.env.PORT || 3000
http.listen(PORT, function () {
  console.log('Server listening on port: ', PORT)
})


routes(io)
// app.get("/tweets")//routes
// console.log(data.sentimentToBlue())




app.use(express.static('public'))
