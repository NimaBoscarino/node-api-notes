var request = require('request');

request({
  url: `https://api.github.com/users/sircmpwn`,
  headers: {
    'user-agent': 'node application'
  }
}, function (error, response, body) {

  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.

  var drew = JSON.parse(body)

  console.log(drew.name)
});