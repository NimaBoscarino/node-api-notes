var request = require('request');
require('dotenv').config()

var apiKeyWeather = process.env.apiKeyWeather

function getWeatherFromLatLng(latLng, afterYouGetWeather) {
  request({
    url: 'https://api.darksky.net/forecast/' + apiKeyWeather + '/' + latLng.lat + ',' + latLng.lng
  }, function (error, response, body) {
    var data = JSON.parse(body)
    var parsedBody = JSON.parse(body)
    var weather = parsedBody.currently

    afterYouGetWeather(weather)
  
  }); 
}

module.exports = getWeatherFromLatLng