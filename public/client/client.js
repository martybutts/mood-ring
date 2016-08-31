var xhr = require('xhr')
var socket = io()
var endpoint = '/tweets'


socket.on('connect', function () {
  console.log('client is connected');
})

socket.on('color', function (data) {
   const { rgb } = data
   console.log('rgb(' + [rgb[0], rgb[1], rgb[2]].join(',') + ')');
  //  document.body.style.backgroundColor = 'rgb(' + [rgb[0], rgb[1], rgb[2]].join(',') + ')';
  //  document.body.style.backgroundColor = 'rgb(255,0,255)';
 });

function getMood() {
    xhr.get(endpoint, function (err, data) {
      if (err) console.error(err)
    console.log('this is the data from getMood', data)
  })
}

window.onload = function () {
  console.log('client-side working')
  // getMood()
  // document.body.style.backgroundColor = 'rgb(127,0,127)';
}
