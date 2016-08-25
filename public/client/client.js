var xhr = require('xhr')
var endpoint = '/tweets'
// var rgb = require('../../routes/index.js')
// console.log('client-side rgb', rgb)
function getMood() {
    xhr.get(endpoint, function (err, data) {
      if (err) console.error(err)
    console.log('this is the data from getMood', data)
  })
}

window.onload = function () {
  console.log('client-side working')
  getMood()
  // document.body.style.backgroundColor = color
}

// controlColor(data) {
//   document.body.style.backgroundColor = 'rgb(' + rgb.join(',') + ')'
// }
