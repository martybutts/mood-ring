var dotenv = require('dotenv')
var isUrl = require('is-url')
var request = require('superagent')
var Twitter = require('twitter')
var sentiment = require('sentiment');
var cleanThisTweet = require('clean-this-tweet-up');

var response = [], dbData = []; // to store the tweets and sentiment

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
  // var integer = result.score;

  // sentimentToRed (sentimentScore) {
  //   return (12.8 * sentimentScore) +
  // }
  if (result.score === 0) {
    response.push(result.score, [128, 0, 128]);
    console.log(response);
  }
  else if (result.score === 10){
    console.log(result.score, [0, 0, 255]);
  }

  else if (result.score === -10){
    console.log(result.score, [255, 0, 0]);
  }
// document.write(result);

  // response.push(result.score);
    // console.log(result.score, event.text)
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
