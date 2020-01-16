let axios = require('axios');
let errors = require('../../utils/errors');
let config = require('../../utils/config');

const desc = {
    name: "city_temperature",
    description: "Display temperature for a city",
    params: [{
        name: "city",
        type: "string"
    }]
};

function getWeatherAt(req, res) {
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + req.params.city + '&units=metric&appid=' + config.api_weather.key)
        .then(function(response) {
            res.status(200);
            res.json({
                temp: {
                    temp: response.data.main.temp,
                    temp_min: response.data.main.temp_min,
                    temp_max: response.data.main.temp_max
                },
                atmosphere: {
                    pressure: response.data.main.pressure,
                    humidity: response.data.main.humidity
                },
                wind: {
                    wind_speed: response.data.wind.speed,
                    wind_deg: response.data.wind.deg
                }
            });
        })
        .catch(function(error) {
            errors.badRequest(res, 400, "Error in weather request.");
        })
}

module.exports = {
    desc: desc,
    getWeatherAt: getWeatherAt
}