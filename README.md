# emojiku

It turns out there's a severe lack of haiku's. To correct this shortage we're going to find Japanese haiku's that we find on twitter and translate them into English.
We're also going to categorize these haiku's as 'happy', 'sad', or 'neutral' so we can feed the happy haiku's to people who are feeling down.

For this challenge We will use JavaScript and Node for interacting with API's and transforming and manipulating the data we get back. Programmers call this kind of task automation 'scripting'. We'll interact with three API's - the [Twitter REST API](https://dev.twitter.com/rest/public), the [Yandex Translate API](https://tech.yandex.com/translate/) and the [Text Processing Sentiment API](https://market.mashape.com/japerk/text-processing#!documentation) (via the MashApe API aggregator service).

To activate the last one you will need to sign up to Mashape and create an app. Once you're signed in, Mashape will give you a key so you can use the API.
Interacting with an API directly often involves writing a lot of boilerplate authentication code. Fortunately, there are npm modules that make using particular API's easier.
We'll use the [twitter](https://www.npmjs.com/package/twitter) module and the [yandex-translate-api] (https://www.npmjs.com/package/yandex-translate-api) module.


These modules make use of Node's [Error-first Callback](http://thenodeway.io/posts/understanding-error-first-callbacks/) pattern, e.g:

```js
yandexTranslate.translate('My name is Brandon', { to: 'es' }, function (err, translation) {
  if (err) { console.log(err) }
  console.log(translation.text);
  // =>  Mi nombre es Brandon
});
```

In the above example the `yandexTranslate.translate` method takes three arguments. The final argument is a callback function that will execute once the google translate API responds.
The callback function takes two arguments: `(err, translation)`. This pattern - the callback as the final argument in an asynchronous function,
and the callback having an error argument, is very common in JavaScript.

Unfortunately, sometimes we need to do *another* asynchronous task with the result of the first call.
This situation can lead to a situation known as [Callback Hell](http://callbackhell.com/).

In the first three releases we're going to write code that nests accross the screen like this using anonymous callback functions.
Then we'll refactor to named callbacks and explore these different styles.

## Release 1

### Setup

1. Register a Twitter app here: https://apps.twitter.com/app/new
1. Configure the [twitter npm module](https://www.npmjs.com/package/twitter)
  - Skim the docs
  - Follow the instructions for loading environment variable in (we're using dotenv, so remember to set up `.env` with keys/ secrets for the APIs)


### Deliverables

1. Use the twitter module to search twitter for recent tweets that contain the hashtag "#haiku".
1. Modify the search to just return japanese results (read the docs for search, check out [this](https://dev.twitter.com/rest/reference/get/help/languages) for help with language codes)
1. Write a test for a function 'extractTweetText` that takes in a tweet object and returns the tweet text.
1. Make the test pass.
1. Use the `extractTweetText` function and your util module's `map` function (or `Array.map()` if you insist)  to log the tweets to the console.

Note: `index.js` requires the npm module [colors](https://www.npmjs.com/package/colors). You might want to use this when you print to the console.


## Release 2

Now we want to translate our haiku's into English using the `yandex-translate-api` module.
We often need to iterate through an array and make asynchronous requests for each item in the array.

### Deliverables

1. Translate the haiku's into English


## Release 3

Now we're going to enter the third layer of nesting.
Finally we want to get the sentiment of the haiku's. 

1. Take a look at the [Text Processing Sentiment API](https://market.mashape.com/japerk/text-processing#!documentation).

Click on "POST sentiment" in the left hand side, and 'node' in the right hand bar. The example uses [unirest](https://www.npmjs.com/package/unirest). Note the differences between this example and [superagent](https://www.npmjs.com/package/superagent)

### Deliverables

1. Using a superagent.get() fetch the sentiment of each haiku: 'pos', 'neg', or 'neutral'. You will need to use .set() to set the Mashape API key.
1. write a function  to print the the haiku's original english and translated text to the console with an appropriate [emoji](https://www.npmjs.com/package/node-emoji)

## Release 4

Break your async code up into named functions. There are no 'right' answers here. Just experiment with wrapping functions around blocks of code and using named callbacks

Example:

```js

// async imperative code
client.get('url', params, function (err, res) {
  if (err) { console.log(err) }
  var tweets = extractTweets(res.body)
})

// named callback
function handleResponse (err, res) {
  if (err) { console.log(err) }
  var tweets = extractTweets(res.body)
}

client.get('url', params,  handleResponse)


// 'wrapper' function
function getTweetsAsync (params, callback) {
  client.get('url', params, callback)
}

module.exports = getTweetsAsync

```


## Resources

Number | Name
-------|-------------------
1.     | [APIs](https://en.wikipedia.org/wiki/Application_programming_interface)
2.     | Authentication
3.     | Environment
4.     | [Nested Callbacks](http://callbackhell.com/)


