var dotenv = require('dotenv')
var request = require('superagent')
var Twitter = require('twitter')
var sentiment = require('sentiment');
var cleanThisTweet = require('clean-this-tweet-up');

// var response = [], dbData = []; // to store the tweets and sentiment

// load environment variables
dotenv.load()

// configure twitter client
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// get data from twitter

var stream = client.stream('statuses/filter', {language: 'en', track: 'lunch'});
stream.on('data', function(event) {
  var tweet = event && event.text;
  var result = sentiment(tweet);
  var score = result.score;
console.log(score)

//convert integer to rgb values
var sentimentToRed = function () {
  return (12.8 * score) + 127.8
  }
console.log(sentimentToRed(), 'red')

var sentimentToBlue = function () {
  return 255 - ((12.8 * score) + 127.8)
}
console.log(sentimentToBlue(), 'blue')


//load color in html
// canvas.innerHTML.style.color = (sentimentToRed(), 0, sentimentToBlue())



// var color = (sentimentToRed(), 0, sentimentToBlue());




// function addColor () {
// }

  // if (result.score === 0) {
  //   response.push(result.score, [128, 0, 128]);
  //   console.log(response);
  // }
  // else if (result.score === 10){
  //   console.log(result.score, [0, 0, 255]);
  // }
  //
  // else if (result.score === -10){
  //   console.log(result.score, [255, 0, 0]);
  // }
// document.write(result);

  // response.push(result.score);
    // console.log(result.score, event.text)
  // console.log(event && event.text);
});


stream.on('error', function(error) {
  throw error;
});

module.exports = {
  sentimentToRed,
  sentimentToBlue
}
// // window.onload = function () {
//   document.body.style.backgroundColor = "red"
// // }
//extract tweets
//convert using sentiment
//convert sentiment result to colors
//load color in index.html
