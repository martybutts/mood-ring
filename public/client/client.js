var xhr = require('xhr')
var socket = io();
var endpoint = '/tweets'
var rgb = require('../../routes/index.js')


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

function getMood() {
    xhr.get(endpoint, function (err, data) {
      if (err) console.error(err)
    console.log('this is the data from getMood', data)
  })
}

window.onload = function () {
  console.log('client-side working')
  getMood()
  document.body.style.backgroundColor = color
}

controlColor(data) {
  document.body.style.backgroundColor = 'rgb(' + rgb.join(',') + ')'
}
