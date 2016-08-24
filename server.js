var express = require('express')
var path = require('path')
// var data = require('./index.js');
var server = express()
var routes = require('./routes/index');
//server setup
var PORT = process.env.PORT || 3000
server.use("/", routes)
// server.get("/tweets")//routes
// console.log(data.sentimentToBlue())




server.use(express.static('public'))


server.listen(PORT, function () {
  console.log('Server listening on port: ', PORT)
})
