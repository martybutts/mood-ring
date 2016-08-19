var express = require('express')
var path = require('path')
var data = require('./index.js');
var server = express()

//server setup
var PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  console.log('Server listening on port: ', PORT)
})

server.use(express.static('public'))

//routes
