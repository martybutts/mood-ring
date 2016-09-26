var express = require('express');
var dotenv = require('dotenv')
var request = require('superagent')
var Twitter = require('twitter')
var sentiment = require('sentiment');
var cleanThisTweet = require('clean-this-tweet-up');


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
  return Math.round( (12.8 * score) + 127.8)
}
var sentimentToBlue = function (score) {
  return  Math.round (255 - ((12.8 * score) + 127.8) )
}

var extractScore = function (event) {
  var tweet = event && event.text;
  var result = sentiment(tweet);
  var score = result.score;
console.log(tweet)
console.log('')
  return score
}

module.exports = function (io) {
  // get data from twitter
  // app.get('/tweets', function(req, res, next) {
  io.on('connection', function (socket) {
    var stream = client.stream('statuses/filter', {language: 'en', track: 'trump'});

    stream.on('data', function(event) {
      var score = extractScore(event)

      var rgb = [sentimentToRed(score), 0, sentimentToBlue(score)]

      socket.emit('color', { rgb: rgb });

    })

    stream.on('error', function(error) {
      throw error;
    });
  });
}
