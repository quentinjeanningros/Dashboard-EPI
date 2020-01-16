let moment = require('moment');
let searchCocktail = require('../api/cocktails/searchCocktail');
let searchIngredients = require('../api/cocktails/searchIngredients');
let pokedex = require('../api/pokemon/pokemon');
let types = require('../api/pokemon/types');
let parking = require('../api/strasbourg/parking');
let weather = require('../api/weather/weather');

function about(req, res) {
    res.status(200);
    res.json({
        client: {
            host: req.ip
        },
        server: {
            current_time: moment().unix(),
            services: [{
                name: "weather",
                widgets: [
                    weather.desc
                ]
            }, {
                name: "strasbourg",
                widgets: [
                    parking.desc
                ]
            }, {
                name: "pokemon",
                widgets: [
                    pokedex.desc,
                    types.desc
                ]
            }, {
                name: "cocktail",
                widgets: [
                    searchCocktail.desc,
                    searchIngredients.desc
                ]
            }]
        }
    });
}

module.exports = {
    about: about
};