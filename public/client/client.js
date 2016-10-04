var socket = io()

socket.on('connect', function () {
  console.log('client is connected');
})

socket.on('color', function (data) {
   console.log('data', data)

   const { rgb } = data
   console.log('rgb(' + [rgb[0], rgb[1], rgb[2]].join(',') + ')');
   document.body.style.backgroundColor = 'rgb(' + [rgb[0], rgb[1], rgb[2]].join(',') + ')';

 });
