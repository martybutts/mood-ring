// var server = require('http').createServer();
// var url = require('url');

var express = require('express');
var router = express.Router();
var dotenv = require('dotenv')
var request = require('superagent')
var Twitter = require('twitter')
var sentiment = require('sentiment');
var cleanThisTweet = require('clean-this-tweet-up');
var io = require('../server')

// load environment variables
dotenv.load()

// configure twitter client
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

//convert integer to rgb values
var sentimentToRed = function (score) {
  return (12.8 * score) + 127.8
}
var sentimentToBlue = function (score) {
  return 255 - ((12.8 * score) + 127.8)
}

var extractScore = function (event) {
  var tweet = event && event.text;
  var result = sentiment(tweet);
  var score = result.score;

  return score
}

// get data from twitter
router.get('/tweets', function(req, res, next) {
  var stream = client.stream('statuses/filter', {language: 'en', track: 'lunch'});

  stream.on('data', function(event) {
    var score = extractScore(event)
  })

  var rgb = [sentimentToRed(score), 0, sentimentToBlue(score)]


  io.on('connection', function(socket){
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });
});

  stream.on('error', function(error) {
    throw error;
  });
});

  //load color in html
  // canvas.innerHTML.style.color = (sentimentToRed(), 0, sentimentToBlue())
  // console.log(result.score, event.text)
  // console.log(event && event.text);

module.exports = router
