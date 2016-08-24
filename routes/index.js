var express = require('express');
var router = express.Router();
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

router.get('/tweets', function(req, res, next) {
  var stream = client.stream('statuses/filter', {language: 'en', track: 'lunch'});
  stream.on('data', function(event) {
    var tweet = event && event.text;
    var result = sentiment(tweet);
    var score = result.score;
   console.log(score)

  //convert integer to rgb values
  var sentimentToRed = function () {
    return (12.8 * score) + 127.8
    // console.log('red', sentimentToRed())
    }
  var sentimentToBlue = function () {
    return 255 - ((12.8 * score) + 127.8)
    // console.log('blue', sentimentToBlue())
  }
 var rgb = [sentimentToRed(), 0, sentimentToBlue()]
 console.log('here is rgb in routes', rgb)
// document.body.style.backgroundColor = 'rgb(' + rgb.join(',') + ')';
// console.log('here is the color')
res.send({test: 'score'})
});

stream.on('error', function(error) {
  throw error;
});

});
  //load color in html
  // canvas.innerHTML.style.color = (sentimentToRed(), 0, sentimentToBlue())



    // console.log(result.score, event.text)
    // console.log(event && event.text);




// GET home page.

module.exports = router;
