var request = require('request');
require('dotenv').config()

var apiKey = process.env.apiKey

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

module.exports = getLatLngFromAddress