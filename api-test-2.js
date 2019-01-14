var request = require('request');
require('dotenv').config()

var apiKey = process.env.apiKey
var apiKeyWeather = process.env.apiKeyWeather
var myHome = '5782+Mayview+Circle+Burnaby+BC'

// GETTING THE LATLNG FROM ADDRESS
function getLatLngFromAddress(address, afterYouGetTheLatLng) {
  request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + apiKey
  }, function (error, response, body) {
    var data = JSON.parse(body)
    var latLng = data.results[0].geometry.location
  
    afterYouGetTheLatLng(latLng)
  
  }); 
}

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

getLatLngFromAddress(myHome, function(lat_lng) {
  getWeatherFromLatLng(lat_lng, function (weather) {
    console.log('THE WEATHER IS', weather.summary)
  })
})
