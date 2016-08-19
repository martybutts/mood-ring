var dotenv = require('dotenv')
var isUrl = require('is-url')
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

//sentiment test code
var test1 = sentiment('Cats are stupid.');
console.log(test1);        // Score: -2, Comparative: -0.666

var test2 = sentiment('Cats are totally amazing!');
console.log(test2);        // Score: 4, Comparative: 1


// get data from twitter
var stream = client.stream('statuses/filter', {language: 'en', track: 'lunch'});
stream.on('data', function(event) {
  var tweet = event && event.text
  var result = sentiment(tweet)
    console.log(result.score, event.text)
  // console.log(event && event.text);
});

stream.on('error', function(error) {
  throw error;
});

//extract tweets
//convert to strings
//push to an array

//convert using sentiment
//convert sentiment result to colors
//load color in index.html
