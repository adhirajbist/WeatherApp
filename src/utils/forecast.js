const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e68eef6c2488081063fcd0bc6aaf7ce1/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({url, json : true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        } else if(body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined, body.hourly.summary + ' It is currently ' + body.currently.temperature + ' degrees Fahrenheit out. Probability of precipitation is: ' + body.currently.precipProbability +'.')
        }
    })
}

module.exports = forecast 