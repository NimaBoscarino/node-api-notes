var getLatLngFromAddress = require('./latlng')
var getWeatherFromLatLng = require('./weather')

var myHome = '5782+Mayview+Circle+Burnaby+BC'

getLatLngFromAddress(myHome, function(lat_lng) {
  getWeatherFromLatLng(lat_lng, function (weather) {
    console.log('THE WEATHER IS', weather.summary)
  })
})