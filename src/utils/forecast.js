const request = require('request');

function forecast(latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=8c6c0f1714e119defff5c06b03f6a190&query=' + latitude + ',' + longitude + '&units=m';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect location services', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+': It is currently ' + body.current.temperature+ ' degree');
        }
    });
}

module.exports = forecast;